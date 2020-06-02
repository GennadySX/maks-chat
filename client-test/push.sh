#!/usr/bin/env bash

d=`date +"%d-%m"`
h=`date +"%H"`


read -p " commit -stamp: " stamp

read -p " enter commit message: " mess


git add .

git commit -m "adsme-react --$d -$stamp  :$mess"


git push -u origin master