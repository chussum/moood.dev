---
title: 쉽게 살펴보는 git, git-flow 명령어
date: 2015-12-02 10:05:98
category: git
---

## git clone [사용자명@도메인:/원격/저장소/경로]

> 로컬(사용자 PC)에 실제 서버(origin, 원격지)의 프로젝트 소스 파일들이 없는 경우, 실제 서버에 저장되어 있는 소스들을 받아올 때 사용합니다.
> 즉, <span style="color: #f83d16">인터넷에서 게임(저장소)을 다운받는 단계</span>라 보시면 됩니다.
> 대체로 최초 1회만 사용됩니다.

```bash
$ git clone git@gehirn.moodselah.com:moodselah
```

> 소스를 로컬(사용자 PC)로 받아 온 후부터는 git checkout, pull, push, commit과 같은 명령어들을 사용하게 됩니다.

## git flow init

> git의 확장인 `git-flow` 명령어들을 지속적으로 사용하기 위해 사용하는 명령어입니다.
> 저장소(branch)들을 초기화하는 과정인데, 대체로 `git clone` 후에 최초 1회만 사용됩니다.
> 즉, <span style="color: #f83d16">게임 계정을 만들고 캐릭터 생성하는 단계</span>라 보시면 됩니다.

> 해당 명령어를 사용하면 branch 이름들을 어떻게 지정할 것인지 물어보는데, 기본값으로 적용하는 것을 추천드립니다.

## git checkout [저장소(branch)이름]

> 다른 저장소에 접근하고 싶을 때 사용하는 명령어입니다.
> <span style="color: #f83d16">본캐를 로그아웃하고 부캐로 로그인한다</span>고 보면됩니다.  
> <span style="color: #f83d16">USB메모리로 본다면, E:\에서 F:\로 옮겨가는 단계</span>입니다.

```bash
$ git checkout hotfix/3.3.39
Switched to branch 'hotfix/3.3.39'
```

## git branch

> 기본적으로는 로컬(사용자 PC)의 저장소(branch)들을 확인할 때 사용합니다.  
> 최초 'git clone'을 받고나서는 master만 존재하며, 'git flow init' 명령어를 사용한 후에는 master, develop이 존재하게 됩니다.  
> 해당 명령어를 통해 사용자가 현재 어떤 저장소(branch)에 접근 중인지도 확인이 가능합니다.  
> 즉, <span style="color: #f83d16">컴퓨터에 어떤 USB메모리들이 꽂혀 있고, 어느 USB드라이브(E:\, F:\)를 사용중인지 확인</span>하는 명령어입니다.  
> <span style="color: #f83d16">게임 측에서 본다면, 내가 어떤 캐릭터로 접속 중인지와 내가 보유중인 캐릭터들을 확인하는 명령어</span>입니다.  
> 옵션에 따라 원격지(origin)의 저장소(branch) 목록들도 볼 수 있습니다.

```bash
$ git branch
  develop
* hotfix/3.3.39
  master
```

> **-r** 옵션을 사용하면 실제서버(origin, 원격지)에 존재하는 저장소(branch) 목록들을 볼 수 있습니다.

```bash
$ git branch -r
```

## git branch [저장소(branch)이름], git checkout -b [저장소(branch)이름]

> 기본적인 명령어 뒤에 사용할 저장소 이름을 붙이면 저장소(branch)를 생성할 수 있습니다.  
> 생성 시에 현재 접근 중인 저장소(branch)의 소스 파일들이 복사되어 생성됩니다.

## git branch -d [저장소(branch)이름]

> 저장소(branch)를 삭제하는 명령어입니다. <span style="color: #f83d16">(게임 캐릭터를 삭제하는 단계)</span>  
> 로컬(사용자 PC)에서만 삭제되므로, 안심하고 필요할 때마다 사용할 수 있습니다.  
> 실제 원격지 서버(origin)에 존재하는 저장소가 직접 삭제되는 것이 아닙니다.

## git status

> 현재 브랜치(branch)의 상태를 볼 때 사용합니다.  
> 이 명령어를 통해 내 컴퓨터(로컬)에서 어떤 파일이 수정되거나 추가 혹은 삭제되었는지 확인할 수 있습니다.  
> <span style="color: #f83d16">게임 측면에서 본다면 내가 어떤 스킬을 올렸고, 스탯 포인트가 얼마나 되는지 확인하는 명령어</span>입니다.

```bash
$ git status
On branch master
Your branch is behind 'origin/master' by 12 commits, and can be fast-forwarded.
  (use "git pull" to update your local branch)

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   server/SlackBot.js

no changes added to commit (use "git add" and/or "git commit -a")
```

## git add [파일경로/파일명 혹은 파일명]

> 현재 사용자의 PC에서 작업한 소스들을 실제 서버(origin, 원격지)에 업로드하기 위해서 사용합니다.
> 하지만, 실제로 업로드 하는 것이 아니라 임시적으로 어떤 파일들을 업로드 할 것인지 정하는 단계입니다.

> 해당 명령어를 사용 후에 'git status'를 통해 프로젝트의 상태를 확인하면, 작업한 소스파일들이 추가/삭제/변경된 것을 확인이 가능합니다.

### 1. git add [파일명]

해당 파일만 선택적으로 실제 서버(origin, 원격지)에 업로드하기 위해서 사용합니다.

```bash
$ git add images/icon.png
```

### 2. git add .

사용자의 PC에서 현재 디렉토리 기준으로 추가/삭제/변경한 모든 파일들을 실제 서버(origin, 원격지)에 업로드하기 위해서 사용합니다.

```bash
$ git add .
```

## git commit -m'메세지'

> `git add`를 통해 임시적으로 어떤 파일을 올릴 것인지 정한 후에 사용하는 명령어입니다.  
> 현재 사용자의 PC(로컬)에 추가/삭제/변경된 소스들을 임시저장소(로컬저장소)에 업로드한다고 보시면 됩니다.  
> 쉽게 생각하면 `git add`를 통해 추가/삭제/변경된 파일들을 <span style="color: #f83d16">USB메모리에 옮겨놓는 단계</span>라 보시면 됩니다.

> commit을 사용하면 로컬에서도 이력(history, log)을 관리 할 수 있습니다.
> 이 때, 이력을 남기기 위해 메세지를 포함시킵니다.

```bash
$ git commit -m'IE7 대응'
```

> 커밋(commit)메세지를 잘못 입력 했을 경우 `git commit --amend` 명령어를 통해 수정이 가능합니다. <span style="color: #f83d16">(**push** 하기 전에만 수정 가능)</span>

## git pull origin [저장소(branch)이름]

> 다른 개발자분이 작업한 내용(push한 소스들)들을 가져오기 위해 사용합니다. <span style="color: #f83d16">게임을 최신버전으로 업데이트하는 과정</span>이라 보시면 됩니다.
> branch 이름은 현재 로컬에서 작업중인 branch 이름(=로컬저장소)을 사용해야 합니다.  
> 로컬저장소는 `git branch` 명령어를 통해 확인이 가능합니다.

## git push origin [저장소(branch)이름]

> 커밋한 내용들을 실제 서버(origin, 원격지)에 업로드, 적용하기 위해 사용합니다.  
> 즉, <span style="color: #f83d16">`git commit`을 통해 USB메모리에 옮긴 파일들을 다른 컴퓨터에 복사/붙여넣기하는 과정</span>입니다.  
> push 하기 전에 pull 명령어를 통해 로컬 데이터를 최신 데이터로 갱신 후에 사용합니다.

```bash
$ git push origin hotfix/3.3.37
Total 0 (delta 0), reused 0 (delta 0)
To git@gehirn.moodselah.com:moodselah.git
* [new branch]    hotfix/3.3.37 -> hotfix/3.3.37
```

## git tag

> 저장소의 tag들을 확인합니다.  
> 보통 `git pull`을 통해 최신화를 시킨 후에 명령어를 사용합니다.  
> <span style="color: #f83d16">게임 클라이언트의 버전 목록들을 보는 것</span>과 같습니다.

```bash
$ git tag
2.30.0
2.30.1
2.30.10
2.30.11
2.30.2
2.30.3
2.30.4
2.30.5
2.30.6
2.30.7
2.30.8
2.30.9
2.31.0
2.31.1
```

## git flow hotfix start [VERSION]

> 새로운 핫픽스 저장소(branch)를 만드는 git flow 명령어입니다.  
> 해당 명령어를 실행하기 전에 `git pull`을 통해 최신 데이터를 받아 온 후에 실행하는게 좋습니다.  
> 게임 측에서 보면, `긴급패치`를 위한 또 다른 `테스트서버`를 만드는 것과 같습니다.

```bash
$ git flow hotfix start 3.3.37
Switched to a new branch 'hotfix/3.3.37'
```

## git flow hotfix finish [VERSION]

> 핫픽스 저장소에서 추가/삭제/변경된 내용들을 master 및 develop 브랜치에 적용시키기 위해 사용하는 명령어입니다.  
> 즉, <span style="color: #f83d16">긴급패치를 위한 `테스트서버`에 적용된 변경 사항들을 `정식테스트서버`*(develop)*와 `정식서버`*(marstar)*에 적용하기 위해 사용</span>한다고 보시면 됩니다.  
> 해당 명령어를 사용하고 나면 로컬(사용자 PC)에만 적용된 상태이기 때문에, 추가적인 작업으로 원격지 서버(origin)에 push를 해줘야 합니다.

> 즉, `git checkout master`와 `git checkout develop`을 통해 브랜치를 전환한 후에, `git push origin master`와 `git push origin develop`을 통해 각각 원격지에 최신 코드를 푸시해주어야 합니다.  
> `git flow hotfix finish [VERSION]`를 하면 `tag`도 자동으로 `[VERSION]`값으로 생성되는데, 이 때 실제 서버에도 tag 정보를 적용시키기 위해서 `git push --tags` 명령어를 추가적으로 사용해야합니다.

```bash
$ git flow hotfix finish 3.3.36
Switched to branch 'master'
Your branch is up-to-date with 'origin/master'
Merge made by the 'recursive' strategy.

$ git push --tags
Counting objects: 1, done.
Writing objects: 100% (1/1), 153 bytes | 0bytes/s
Total 1 (delta 0), reused 0 (delta 0)
To git@git@gehirn.moodselah.com:moodselah
* [new tag]       3.3.36 -> 3.3.36
```

> `git-flow`를 사용하지 않고 위의 과정들을 진행한다면 아래와 같이 진행하게됩니다.

```bash
$ git checkout master               // master 브랜치로 이동
$ git checkout -b hotfix/3.3.36     // master의 브랜치를 hotfix/3.3.36이라는 브랜치의 이름으로 새로 복사
------------------------------------------------------------
      파일 추가 및 수정 (commit & push)
------------------------------------------------------------
$ git checkout develop              // develop 브랜치로 이동
$ git merge hotfix/3.3.36           // develop 브랜치에 변경된 코드를 합침
$ git push origin develop           // 변경된 develop 브랜치를 원격지에 적용
$ git checkout master               // master 브랜치로 이동
$ git merge hotfix/3.3.36           // master 브랜치에 변경된 코드를 합침
$ git tag 3.3.36                    // 현재 시점을 3.3.36이라는 태그 값으로 지정
$ git push origin master            // 변경된 master 브랜치를 원격지에 적용
$ git branch -d hotfix/3.3.36       // hotfix/3.3.36 브랜치 로컬에서 제거
$ git push --tags                   // 추가된 태그값들 원격지에 적용
```

## git stash -u

> 작업 중인 내용을 임시 공간에 보관하기 위해 사용합니다.  
> 작업자 본인이 hotfix/3.3.37 저장소에서 작업 중인데 새롭게 hotfix/3.3.38 저장소가 생성되었을 경우 사용합니다.  
> 충돌*(conflict)*을 방지하기 위해 사용하기도 합니다.

> 게임 측에서 본다면, <span style="color: #f83d16">부캐로 아이템을 옮기기 위해 창고에 아이템을 보관하는 명령어</span>입니다.

## git stash pop

> `git stash`를 통해 보관한 파일들을 다시 불러옵니다.  
> 즉, <span style="color: #f83d16">창고에 보관한 아이템을 다시 찾아오는 명령어</span>입니다.

```bash
$ git stash pop
On branch hotfix/3.3.37
Changes not statged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:    www/web/admin/etc/daterange_stats.php

no changes added to commit (use "git add" and/or "git commit -a")
Dropped refs/stash@{0} (77bd165d8878a6d05656ead71aa75e744385bb4d)
```

<br>

> 이 외에도 git에는 많은 명령어가 있지만, 여기에서 다루기에는 너무 방대해 자주 쓰는 명령어들만 간단하게 정리해봤습니다. 잘못된 정보는 댓글로 알려주시면 바로 수정하겠습니다.

## 참고 사이트

- https://rogerdudler.github.io/git-guide/index.ko.html
- http://danielkummer.github.io/git-flow-cheatsheet/index.ko_KR.html

<br>
