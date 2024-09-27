---
title: Ritmix RZX-50 - Исследование стандартной прошивки
author: Dmitry Smagin
published: 2014-01-10T00:00:00Z
tags: Ritmix RZX-50, Ingenic JZ4755
---

# Ritmix RZX-50: Исследование стандартной прошивки

Стандартные прошивки Ritmix RZX-50 и Dingoo A380 основаны на Dingux для
Dingoo A320, в основе которой, в свою очередь, лежит ядро linux 2.6.24.3
для SoC JZ4740 от компании Ingenic.

### Преамбула

Первоисточником информации о SoC Ingenic JZ47XX является
[ftp](ftp://ftp.ingenic.cn/) самой компании Ingenic, который на январь 2014
содержит уже в основном маркетинговую информацию и минимум исходных кодов
и документации. К счастью, имеется
[зеркало](ftp://grids.be/mirror/ftp.ingenic.cn/), где есть всё, что Ingenic
когда-либо выкладывала в общий доступ, включая руководство по
программированию SoC от JZ4720 до JZ4760 включительно.

Однако, исходные коды ядра linux и uC/OS-II предоставляются только для т.н.
референсных плат, которые зачастую имеют мало общего с конечным продуктом.
Фабрики, производящие плееры или консоли на основе SoC
Ingenic получают от неё нужные исходные коды, которые затем модифицируюся
для конкретного изделия. Вот эти самые модификации очень редко публикуются
или выкладываются на сайтах.

Важно отметить, что поддержка своих чипсетов в ядре была сделана компанией
Ingenic довольно своеобразно, зачастую с полным игнорированием правил,
принятых среди разработчиков ядра: придумывались нестандартные интерфейсы,
код изобиловал самокопированием (copy-paste), повсеместно нарушались
соглашения по оформлению кода, вместо использования стандартных драйверов
заново писались свои.

Это вылилось в частности в то, что вышли всего две версии ядра 2.6.24.3 и
2.6.31.3 и с тех пор не обновлялись вообще. В главную ветку ядра код
Ingenic не был принят.

### Dingux для Dingoo A320

Dingux появился, когда в руки испанскому инженеру-энтузиасту попала консоль
Dingoo A320 на базе SoC JZ4740  и он решил попробовать запустить на ней
полноценный linux.
С помощью исходных кодов от Ingenic и реверс-инженеринга загрузчика из утилиты
анбрика ему удалось сравнительно быстро создать действующий дистрибутив, о чём
подробно описывалось в его [блоге](https://web.archive.org/web/20170915094027/http://www.dingux.com/). Исходники ядра linux
2.6.24.3, buildroot для сборки корневой файловой системы, а также загрузчик
были выложены [тут](http://code.google.com/p/dingoo-linux).

Для упрощения была реализована схема с двойной загрузкой (dualboot), при
которой сохранялась оригинальная операционная система на основе uС/OS-II, а
Dingux (ядро и rootfs) располагалась на внешней SD-карте прямо на разделе FAT32.
При включении по умолчанию грузилась оригинальная прошивка, при включении с
зажатым SELECT - Dingux. Модифицированный загрузчик монтировал SD-карту 
на /boot, грузил
с неё ядро, далее монтировал образ файловой системы rootfs, также монтируя
папку local SD-карты на /boot/local (симлинк /usr/local). Таким образом,
дополнительный софт размещался в папке local на SD-карте. Недостатком этой
схемы являлась невозможность подключения Dingoo как внешнего накопителя,
т.к. rootfs располагался на FAT32. Вместо этого был постоянно включён режим
usb-ethernet, что позволяло соединяться с Dingoo по telnet.

Следует отметить, что ядро Dingux в полной мере унаследовало недостатки
ядра Ingenic, которые были усугублены недостаточно грамотным портированием софта
с другой консоли подобного класса - GP2X. Программисты, привыкшие обходить
недостатки linux для GP2X прямым доступом к железу, перенесли свой опыт
на Dingoo, в результате многие программы пытались обращаться к памяти
устройства напрямую
через /dev/mem, например, для считывания состояния кнопок или повышения
рабочей частоты процессора, что делало их неработоспособными на SoC,
отличных от JZ4740.

Этим объясняется низкая совместимость программ Dingux'а Dingoo A320 c
Dingux'ом Dingoo A380 и Ritmix RZX-50 (если не учитывать разные разрешения
экранов).

### Dingux для Dingoo A380 и Ritmix RZX-50

При разработке прошивки для Dingoo A380 и Ritmix RZX-50 была позаимствована
rootfs от Dingoo A320 без каких-либо изменений. Однако, схема расположения
файлов на FAT разделе не годилась для коммерческого использования, поэтому
были внесены следующие изменения: теперь корневая файловая система rootfs
располагается на своём собственном разделе ext3, также в отдельные разделы
выделены сторонний софт (appfs), настройки программ (configfs), а также
файлы пользователя (VFAT).

Структура разделов прошивки Ritmix RZX-50
```
* 0x00000000 - mbr-uboot-msc.bin
* 0x00400000 - uImage
* 0x00800000 - recovery
* 0x00C00000 - rootfs.ext3
* 0x07000000 - appfs.ext3
* 0x0AC00000 - configfs.ext3
* 0x0FC00000 - VFAT
```

### Загрузчик

В качестве загрузчика используется U-Boot 1.1.6 с модификациями от Ingenic.
Исходные коды и патчи доступны
[здесь](ftp://grids.be/mirror/ftp.ingenic.cn/3sw/01linux/01loader/u-boot/).

Производитель Dingoo A380 и Ritmix RZX-50 добавил также свои изменения,
точной информации о которых нет. Предположительно, используется конфигурация
U-Boot для платы CETUS, с добавлением инициализации LCD и выводом на экран
логотипа Dingoo Technology или Ritmix.

Дополнительное исследование загрузчика Ritmix RZX-50 описано в
[этой](https://web.archive.org/web/20210508212910/https://a320.emulate.su/2012/01/25/rzx-50-dostup-k-konsoli-u-boot/)
статье. Подобного разбора загрузчика Dingoo A380 скорее всего не существует.

В файле mbr-uboot-msc.bin есть следующие параметры
запуска ядра и самого U-Boot:
```
bootargs=mem=64M console=ttyS1,57600n8 ip=off rootfstype=ext3 root=/dev/mmcblk0p1 ro

bootcmd=msc read 0x80600000 0x400000 0x300000;bootm bootdelay=0
        baudrate=57600 loads_echo=1 ethaddr=00:2a:c6:2c:ab:f0
        autoload=n bootfile="uImage" boottype="normal"

bootargs=mem=64M console=ttyS1,57600n8 ip=off rw rdinit=/linuxrc 

bootcmd=msc read 0x80600000 0x800000 0x300000;bootm bootdelay=0
        baudrate=57600 loads_echo=1 ethaddr=00:2a:c6:2c:ab:f0
        autoload=n bootfile="uImage" boottype="recovery"
```

Функция recovery по факту не используется, т.к. этот раздел при
прошивке Ritmix RZX-50 оставлен пустым.

### Ядро

Спустя несколько лет после выхода Dingoo A380 и Ritmix RZX-50
исходные коды ядрa были опубликованы:

[Kernel 2.6.24.3 for Dingoo A380](https://github.com/carlos-wong/a380_kernel)
[Kernel 2.6.24.3 for Ritmix RZX-50](https://github.com/carlos-wong/l430_kernel)

Объединённое ядро с фиксами для обоих консолей
[здесь](https://github.com/dmitrysmagin/a380_kernel).

Нестандартные устройства и интерфейсы:

```
/dev/keypad
/dev/udc_cable
/dev/power_cable
/dev/net_fd
/dev/elan_2d4g
/dev/mmcblk0
/dev/mtdblock5
/dev/fm_rda5807p

drivers/char/jzchar/gsensor.c
  /proc/jz/gsensor
  /proc/jz/amp
  /proc/jz/hp_l009
  /proc/jz/medive_nl
  /proc/jz/restart

drivers/char/jzchar/jz_sadc.c
  /proc/jz/battery

drivers/char/jzchar/udc_hotplug.c
  /proc/jz/change_power

drivers/input/keyboard/a380_elan_pad.c
  /proc/jz/elan_pad
  /proc/jz/elan_mcu_statusa

drivers/input/keyboard/a380_gpio_keys.c
  /proc/jz/alt

drivers/input/keyboard/rzx50_gpio_keys.c
  /proc/jz/alt
  /proc/jz/infrared_handle

drivers/video/jz4750_lcd_a380.c
  /proc/jz/tvout
  /proc/jz/lcd_a320
  /proc/jz/lcd_flush
  /proc/jz/lcd_backlight
```

### Корневая файловая система rootfs.ext3

Загрузочный скрипт расположен в /etc/inittab; из него вызывается
скрипт загрузки оболочки (сама оболочка в appfs.ext3).

- /usr/local/sbin/main (прошивка 1.0027)
```
#!/bin/sh
export SDL_NOMOUSE=1
export HOME=/boot/local/home/
cd /usr/local/dmenu
./dmenu
```

- /etc/main (прошивка 1.5009)
```
#!/bin/sh
export SDL_NOMOUSE=1
export HOME=/boot/local/home/
cd /tmp/
rm dmenu.bin
cp /usr/local/dmenu/dmenu.bin /tmp/
./dmenu_ln
```

Здесь видно, что переменная HOME указывает на каталог, который доступен только для чтения.

- /usr/bin/udc_connect.sh

```
#!/bin/sh

if [ -e "/dev/udc_cable" ]
then
    /bin/sync
    /sbin/insmod /lib/modules/jz4740_udc.ko
    MMC_STATUS=`cat /proc/jz/mmc`
    MMC_NAME=`cat /var/MMCNAME`

    if [ $MMC_NAME != "no" ] && [ $MMC_STATUS == "INSERT" ]
    then
        umount -f /mnt/memory
        umount -f /mnt/mmc
        /sbin/insmod /lib/modules/g_file_storage.ko file=/dev/mmcblk0p4,/dev/$MMC_NAME stall=0 removable=1
    else
        umount -f /mnt/memory
        /sbin/insmod /lib/modules/g_file_storage.ko file=/dev/mmcblk0p4 stall=0 removable=1

    fi
fi
```

- /usr/bin/udc_disconnect.sh

```
#!/bin/sh

    /sbin/rmmod g_file_storage
    /sbin/rmmod jz4740_udc
    /bin/mount -t vfat -o rw,utf8 /dev/mmcblk0p4 /mnt/memory

    MMC_STATUS=`cat /proc/jz/mmc`
    MMC_NAME=`cat /var/MMCNAME`
    if [ $MMC_NAME != "no" ] && [ $MMC_STATUS == "INSERT" ] 
    then
        /bin/mount -t vfat -o rw,utf8,noatime /dev/$MMC_NAME /mnt/mmc
    fi
    /bin/sync
```

