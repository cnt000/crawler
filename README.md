# Little Crawler to get data from web

````
$ node src/index.js --do plp --delay 2000

$ node src/index.js --do pdp --delay 200
````

--do [clean|plp|img] --delay [seconds]
--up [clean|img]

do clean: clean data dir
do plp: download json as file on local disk
do pdp: save on firestore pdp datas
do img: download images on local disk
do algolia: load indexes on algolia

up clean: clean GCS directories
up img: upload images on GCS
