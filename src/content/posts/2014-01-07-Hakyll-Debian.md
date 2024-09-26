---
title: Установка Hakyll на Debian
author: Antony Pavlov
published: 2014-01-07T19:03:00Z
tags: Hakyll, pandoc, debian, rsync, apache, markdown
---

# Установка Hakyll на Debian

# Введение #

Ниже описывается методика установки и использования системы
генерации статических сайтов Hakyll на ЭВМ под управлением
Debian Linux.

См. также [статью про установку Hakyll для Windows](http://habrahabr.ru/post/175877).


# Установка простая: ```libghc-hakyll-dev``` #

Для Debian существует пакет ```libghc-hakyll-dev```.
Установим данный пакет:
````
aptitude install libghc-hakyll-dev
````

Создадим каркас для минимального сайта:
````
 $ cp -a /usr/share/hakyll/example/ my-site
````

Теперь можно перейти к разделу
[Развёртывание минимального сайта](#mysite)


# Установка непростая: ```cabal``` #

Будем действовать длинным и нудным путём --- при помощи cabal.

### Замечание 1 ###
Использование cabal потребует
скачивания значительного числа пакетов и их пересборки
(как в Gentoo) так что запаситесь терпением.

### Замечание 2 ###
Установку пакетов cabal производит
по умолчанию в домашний каталог пользователя, то есть
пакеты (и в частности hakyll) становятся доступны
только пользователю запускавшему cabal.

При обновлении системных библиотек
или компилятора ghc возможно нарушение работы Hakyll --- в этом
случае придётся перезапустить процедуру установки при помощи
cabal. В случае совсем капитального обновления для возвращения
Hakyll работоспособности возможно придётся стереть временные
файлы, которые создавались для работы Haskell-программ. Например,
каталоги ```~/.cabal``` и ```~/.ghc```.

## Начальная установка на минимальный Debian ##

Установим компилятор Haskell, систему пакетирования
программ на языке Haskell --- cabal, а также alex и happy,
чтобы не собирать их при помощи cabal.

````
 # aptitude install ghc cabal-install libz-dev alex happy
````
Обновим список пакетов и установим Hakyll:

````
 $ cabal update
 $ cabal install hakyll
````

После окончания работы ```cabal install``` (эта работа может
потребовать десятков минут) нам будет доступен исполняемый файл
```~/.cabal/bin/hakyll-init```.

Создадим каркас для минимального сайта:
````
 $ ~/.cabal/bin/hakyll-init my-site
````

# Развёртывание минимального сайта # {#mysite}

Собираем исполняемый файл для генератора сайта:

````
 $ cd my-site
 $ ghc --make site.hs
````

Для создания новой записи достаточно создать новый файл
```posts/yyyy-mm-dd-NAME.markdown```, где
```yyyy``` --- год, ```mm``` --- месяц, ```dd``` --- день
создания записи, а ```NAME``` --- короткое имя записи,
например, ```2013-12-23-linux-screen-capture.markdown```.
Расширение ```markdown``` можно сократить до двух букв ```md```.

Первые строчки файла должны содержать заголовок вида:

````
---
title: Название новой записи
author: Автор Новой Записи
published: 2014-01-01T00:00:00Z
tags: тег 1, тег 2, тег 3
---
````

Для конвертации страниц в формате Markdown в html-страницы
Hakyll использует программу [pandoc](http://johnmacfarlane.net/pandoc).
Толковое описание диалекта Markdown, используемого в pandoc,
[тут](http://johnmacfarlane.net/pandoc/demo/example9/pandocs-markdown.html).

Для генерации статического сайта необходимо выполнить

````
 $ ./site build
````

сгенерированный сайт окажется в каталоге ```_site```, откуда его
можно перебросить в место постоянной дислокации.

Hakyll можно запустить в режиме web-сервера для просмотра
сгенерированного сайта:

````
 $ ./site server
````

По умолчанию сервер будет доступен по адресу [http://localhost:8000](http://localhost:8000).


# Примеры сайтов на Hakyll #

Примеры сайтов на Hakyll [тут](http://jaspervdj.be/hakyll/examples.html).

На что стоит обратить внимание:

* [http://blog.clement.delafargue.name/](http://blog.clement.delafargue.name) [github sources](https://github.com/divarvel/blog)
* http://www.skybluetrades.net/


````
git clone https://github.com/divarvel/blog
cd blog
ghc --make hakyll.hs
./hakyll build
./hakyll server

ctrl-c

export EDITOR=vi

bash ./new_post.sh
Post name > test2

mv posts/.2013-12-20-test2.md posts/2013-12-20-test2.md

./hakkyl rebuild
./hakyll server
````

# Настройка web-сервера #

Предположим, что статический сайт, который генерирует
hakyll мы будем размещать на выделенном сервере.
Создадим для этого на сервере пользователя blog,
в домашнем каталоге которого и будем размещать сайт.

## Использование rsync ##

Будем использовать rsync для быстрого копирования сгенерированного
сайта на web-сервер. Предположим, что мы находимся в каталоге
с исходными текстами нашего блога и только что сгенеририровали
статический сайт в каталоге ```_site```. Переправим содержимое
```_site``` в одноимённый каталог в домашнем каталоге пользователя
blog на web-серевере ```web.server.to```. Используем rsync
для ускорения передачи данных:

````
rsync -v -az -e ssh --delete _site/ blog@web.server.to:_site
````

## Использование apache ##

Настроим web-сервер apache для хостинга нашего блога.
В каталог ```/etc/apache2/conf.d``` добавляем файл ```hakyll_blog.conf```
со следующим содержимым:

````
Alias /myblog /home/blog/_site

<Directory /home/blog/_site>
        # Allow
        allow from all
        order allow,deny
        # Deny
        #order deny,allow
        #deny from all
        #allow from 127.0.0.1
</Directory>
````

и перезапускам apache.

Теперь при попытке обратиться по адресу ```http://web.server.to/myblog```
в браузере должна показываться главная страница блога.


# Примечания #

NB: В Debian имеется пакет ```cabal-debian```.

NB: При использовании cabal для установки исполняемых программ (alex и happy) возможно стоит выполнить
````
 $ echo "export PATH=$PATH:~/.cabal/bin" >> .bashrc
````
и перелогиниться.
