#!/usr/bin/env bash



git add .

read -p "Your nickname: " user

read -p "Commit message: " message

git commit -m "maks-chat --user:$user  :$message"

read  -p "Branch: " branch

read  -p "Role: " role

git push $branch $role
