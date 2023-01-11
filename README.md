# Team_BC

team_bc

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->


<!-- TABLE OF CONTENTS -->
## Table of Contents

* 1.[About the Project](#about-the-project)
  * [Built With](#built-with)
* 2.[Getting Started](#getting-started)
* 3.[UI](#ui)
* 4.[Service](#service)
* 5.[Database](#database)


<!-- ABOUT THE PROJECT -->
## 1.About The Project

* 회원가입을 통해 계정을 등록하고, 등록된 계정정보로 로그인하여 게시글 및 댓글을 작성하고 수정/삭제할 수 있는 게시판 서비스입니다. 

### Built With
This section should list any major frameworks that you built your project using. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* [PostgreSQL]
* [Flask]
* [React.js]
* [Docker]


<!-- GETTING STARTED -->
## 2.Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* TBD
```sh
TBD
```


<!-- UI -->
## 3.UI

### localhost:port/

> ### Login page

<img src="img/UI_register.png" height="480">

> ### Register page

<img src="img/UI_login.png" height="480">

> ### Board Page

> ### Article Page

> ### Posting Page


<!-- SERVICE -->
## 4.Service

 1. 회원가입을 통한 계정 등록
 2. 등록된 계정정보로 로그인
 3. 게시판에 게시글 작성 및 열람
 4. 게시글 및 댓글 작성 후 수정/삭제

### Service API

* 페이지 조회 : [GET] svc_container:port/board?page=<페이지번호> → 특정 페이지의 글 목록 JSON

  > input : page(페이지 번호)
  >
  > logic : ORM 객체의 get_page() 메서드의 실행
  >
  > output : {success : True/False, data : {{글1제목, 글1글쓴이},{글2제목,글2글쓴이}, … } }

* 글 선택 : [GET] svc_container:port/article?aid=<글번호> → 특정 글의 내용  JSON 반환

  > input : aid (글 고유 번호)
  >
  > logic : ORM 객체의 get_article() 메서드의 실행
  >
  > output : {success : True/False, data : {title : 제목, writer : 글쓴이, article : 본문내용}

* 글 게재 : [POST] svc_container:port/article → 글 게재 성공 여부 JSON

  > input : jsonBodyData (글 게재 API로의 POST 요청 결과 )
  >
  > logic : json 데이터를 ORM 객체의 [post_article()](https://www.notion.so/dcca19a52603482a84a966f922e3499a)로 전달하여 처리 
  >
  > output : {success : True/False}

* 글 수정 [PATCH] svc_container:port/article → 글 수정 성공 여부 JSON

  > input : jsonBodyData (글 수정 API로의 PATCH 요청 결과 )
  > 
  > logic : json 데이터를 ORM 객체의 [edit_article()](https://www.notion.so/dcca19a52603482a84a966f922e3499a)로 전달하여 처리 
  > 
  > output : {success : True/False}

* 글 삭제 [DELETE] svc_container:port/article?aid=<글 번호> → 글 삭제 성공 여부

  > input : aid (글 고유 번호) 
  > 
  > logic : ORM 객체의 [delete_article()](https://www.notion.so/dcca19a52603482a84a966f922e3499a) 메서드의 실행
  > 
  > output : {success : True/False}

* 댓글 호출 : [GET] svc_container:port/article?aid=<글번호>/reply

  > input : aid (글 고유 번호) 
  > 
  > logic : ORM 객체의
  > 
  > output : {success : True/False, data: {댓글1}}


<!-- DATABASE -->
## 5.Database

  ### DB Scheme

* UserInfo

| id | password | email | name |
| :---: | :---: | :---: | :---: |
| VARCHAR (40) | VARCHAR (40) | VARCHAR (40) | VARCHAR (40) |
| NOT NULL | NOT NULL | NOT NULL | NOT NULL |
| PK |  |  |  |

* ArticleInfo

| aid | title | uploader | timestamp | article |
| :---: | :---: | :---: | :---: | :---: |
| INT | VARCHAR (80) | VARCHAR(40) | DateTime | VARCHAR(6000) |
| AUTO INCREMENT | NOT NULL |
| NOT NULL |
| PK | 

* CommentInfo

| rid | aid | reply | uploader | timestamp |
| :---: | :---: | :---: | :---: | :---: |
| INT | INT | VARCHAR (600) | VARCHAR(40) | DateTime |
| AUTO INCREMENT | NOT NULL | NOT NULL |
| NOT NULL |
| PK | 

  ### ORM Method

* get_page(pageNum,articlePerPage=20) → 페이지의 글 JSON

  > input: pageNum (페이지번호), articlePerPage (페이지 당 글 개수 기본값 20)
  >
  > logic: session.query() 로 호출 후 slicing 해서 전달 (페이지당 20개)
  >
  > output : {success : True/False, data : {{글1제목, 글1글쓴이, 글1시간},{글2제목,글2글쓴이,글2시간}, … } }


* get_article(articleID) → 특정 글의 데이터 JSON

  >input : articleID (글 고유 번호)
  >
  >logic : session.query() 로 특정 글을 호출, json화 해서 반환
  >
  >output : {success : True/False, data : {{글1제목, 글1글쓴이},{글2제목,글2글쓴이}, … } }


* post_article(jsonBodyData) → 글 게재 수행 결과 JSON

  >input : jsonBodyData ([글 게재 API](https://www.notion.so/1249b38583ed47bf9da5f604c662f355)의 POST 요청 결과 )
  >
  >logic : json 데이터로부터 값들을 받아 새 값 입력
  >
  >output : {success: True/False}


* edit_article(jsonBodyData) → 글 수정 수행 결과 JSON

  >input : jsonBodyData ([글 수정 API](https://www.notion.so/dcca19a52603482a84a966f922e3499a)의 PATCH 요청 결과 )
  >
  >logic : json 데이터로부터 값들을 받아 새 값 입력
  >
  >output : {success: True/False}


* delete_article(articleID) → 글 삭제 수행 결과 JSON

  >input : articleID (글 고유 번호)
  >
  >logic : session.query()로 고유 번호의 글 삭제, 해당 글에 달린 댓글들 삭제
  >
  >output :
