---
title: 'MySQL InnoDB DEADLOCK'
date: 2017-11-05 15:07:55
category: db
---

**Deadlock**은 교착상태를 의미하는 것으로 동일한 리소스를 공유하고 있는 두 개 이상의 작업들이 자신들의 작업을 진행하기 위해 사용하게되는 리소스를 서로 미리 선점해 놓음으로써, 상대방이 리소스에 접근하는 것을 방해하여 교착상태(이하 deadlock)에 빠진 것을 의미합니다.

**Deadlock**은 상당히 빈번히 발생합니다. 여러 세션들이 공유 리소스인 테이블을 공유하면서 빈번히 테이블에 레코드를 쓰거나, 읽거나, 갱신하거나, 삭제합니다.

이 과정에서 데이터베이스는 리소스의 무결성을 보장하기 위해 동기 메커니즘을 사용합니다. 묵시적이든 명시적이든 트랜잭션을 사용하는데, 바로 이 트랜잭션이 동기 메커니즘 즉 **잠금(LOCK)**입니다. 트랜잭션에 여러 테이블들이 포함되고 여러 세션들이 이 트랜잭션을 동시에 실행하는 경우, 프로그램들은 **deadlock**에 빠질 수 있습니다.

## 예를 들어볼까요?

### 쿼리 순서)

클라이언트 A

```sql{2}
> START TRANSACTION;
> SELECT * FROM t WHERE i = 1 LOCK IN SHARE MODE; (1)
```

클라이언트 B

```sql{2}
> START TRANSACTION;
> DELETE FROM t WHERE i = 1; (2)
```

클라이언트 A

```sql{1}
> DELETE FROM t WHERE i = 1; (3)
ERROR 1213 (40001): Deadlock found when trying to get lock; try restarting transaction
try restarting transaction
```

쿼리를 보면 **(1)**에서 **shared lock**(공유 잠금)이 일어난 걸 알 수 있습니다.

이 후, **클라이언트 B**에서 **(2)** 작업을 하기 위해서는 **exclusive lock**(독점 잠금) 이 필요하기에 **(1)**의 잠금이 끝나길 기다리게 됩니다.

**클라이언트 A**는 **(2)**가 실행 된 후 같은 쿼리 **(3)**을 실행해야 되는데, 이 떄 **(3)**도 마찬가지로 독점 잠금이 필요합니다.
하지만, 잠금 요청 대기열에는 이미 **(2)**의 요청이 들어와 있기에 **(3)**을 위해선 **(2)**가 끝나길 기다리게 됩니다. (대기열 순서에 따라 **(2)** 후로 밀리게 됩니다)

> (1) <- (2)  
> (2) <- (3)  
> (3) <- (1)

**(1)**의 잠금이 풀리기 위해선 트랜잭션이 끝나야 하는데, **(3)**의 잠금 대기때문에 트랜잭션을 끝낼 수가 없습니다.  
이 것을 교착 상태, 즉 **deadlock**이라 표현합니다.  
deadlock 상황을 해결하는 방안은 둘 중 하나의 **트랜잭션을 롤백**하는 방법 밖에는 없습니다.  
그래서 **데이터베이스 엔진**은 **deadlock**으로 판단하게 되면 트랜잭션을 롤백시켜 문제를 해결시키게 됩니다.

## 그럼 deadlock은 어떻게 확인할까요?

**innodb**에서는 **deadlock** 현상이 발생하면 하나의 트랜잭션을 롤백시켜 deadlock을 해결한 후 과정을 로그로 남깁니다.  
로그는 `show engine innodb status` 명령어를 통해서 확인 할 수 있습니다.

```sql
> show engine innodb status
------------------------
LATEST DETECTED DEADLOCK
------------------------
2016-05-03 10:40:12 7f221231d700
*** (1) TRANSACTION:
TRANSACTION 14268102582, ACTIVE 0 sec fetching rows
mysql tables in use 1, locked 1
LOCK WAIT 8 lock struct(s), heap size 2936, 37 row lock(s), undo log entries 2
MySQL thread id 750346761, OS thread handle 0x7f2215516700, query id 11209592031 smtp2 192.168.0.4 hyungdew updating
DELETE FROM hyungdew.dewdew
            WHERE status = 'complete'
            LIMIT 10000
*** (1) WAITING FOR THIS LOCK TO BE GRANTED:
RECORD LOCKS space id 91 page no 57907 n bits 1192 index `dewdew_status` of table `hyungdew`.`dewdew` trx id 14268102582 lock_mode X waiting
Record lock, heap no 576 PHYSICAL RECORD: n_fields 3; compact format; info bits 32
 0: len 1; hex 01; asc  ;;
 1: len 4; hex 00b44501; asc   E ;;
 2: len 4; hex 0003079d; asc     ;;
 
*** (2) TRANSACTION:
TRANSACTION 14268102538, ACTIVE 0 sec starting index read
mysql tables in use 1, locked 1
12 lock struct(s), heap size 2936, 7 row lock(s), undo log entries 6
MySQL thread id 750347460, OS thread handle 0x7f221231d700, query id 11209592036 web1 192.168.0.1 hyungdew updating
DELETE FROM hyungdew.dewdew
            WHERE status = 'complete'
            LIMIT 10000
*** (2) HOLDS THE LOCK(S):
RECORD LOCKS space id 91 page no 57907 n bits 1192 index `dewdew_status` of table `hyungdew`.`dewdew` trx id 14268102538 lock_mode X locks rec but not gap
Record lock, heap no 576 PHYSICAL RECORD: n_fields 3; compact format; info bits 32
 0: len 1; hex 01; asc  ;;
 1: len 4; hex 00b44501; asc   E ;;
 2: len 4; hex 0003079d; asc     ;;
 
*** (2) WAITING FOR THIS LOCK TO BE GRANTED:
RECORD LOCKS space id 91 page no 57907 n bits 1192 index `dewdew_status` of table `hyungdew`.`dewdew` trx id 14268102538 lock_mode X waiting
Record lock, heap no 574 PHYSICAL RECORD: n_fields 3; compact format; info bits 0
 0: len 1; hex 01; asc  ;;
 1: len 4; hex 00b444bc; asc   D ;;
 2: len 4; hex 000276fa; asc   v ;;
 
*** WE ROLL BACK TRANSACTION (1)
------------
TRANSACTIONS
------------
Trx id counter 14272185737
Purge done for trx's n:o < 14272185732 undo n:o < 0 state: running but idle
History list length 2629
LIST OF TRANSACTIONS FOR EACH SESSION:
---TRANSACTION 0, not started
MySQL thread id 750673863, OS thread handle 0x7f2216042700, query id 11216034554 localhost hyungdew init
show engine innodb status
---TRANSACTION 14272185736, not started
MySQL thread id 750674280, OS thread handle 0x7f2212c41700, query id 11216034557 web1 192.168.0.1 hyungdew cleaning up
---TRANSACTION 14272185612, not started
MySQL thread id 750674269, OS thread handle 0x7f22145e6700, query id 11216034364 web1 192.168.0.1 hyungdew cleaning up
---TRANSACTION 14272185581, not started
MySQL thread id 750674267, OS thread handle 0x7f2213e48700, query id 11216034310 web2 192.168.0.2 hyungdew cleaning up
---TRANSACTION 14272185732, not started
MySQL thread id 745115752, OS thread handle 0x7f2210a3b700, query id 11216034543 smtp2 192.168.0.4 hyungdew cleaning up
---TRANSACTION 14272185718, not started
MySQL thread id 745115731, OS thread handle 0x7f2212c82700, query id 11216034518 smtp2 192.168.0.4 hyungdew cleaning up
```

`show engine innodb status` 명령어를 통해 확인 할 수 있는 로그는 **가장 최근의 로그 뿐**입니다. 지나간 정보는 확인 할 수 없습니다.  

로그를 보면 **web1**과 **smtp2**에서 같은 쿼리를 동시에 시도해 **deadlock** 상태가 된 것을 확인 할 수 있습니다.

- TRANSACTION: 트랜잭션에 대한 정보
- WAITING FOR THIS LOCK TO BE GRANTED: Lock을 걸기 위해 대기중인 데이터 정보
- HOLDS THE LOCK(S): 현재 확보 중인 Lock에 대한 정보

## 참조

https://dev.mysql.com/doc/refman/5.7/en/innodb-locking.html
https://dev.mysql.com/doc/refman/5.7/en/innodb-deadlock-example.html