#!/usr/bin/env sh

# остановить публикацию при ошибках
set -e

# сборка
yarn build

# переход в каталог сборки
cd dist

git init
git add -A
git commit -m 'deploy'

# публикация по адресу https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:nmult/4people.git master:gh-pages

cd -