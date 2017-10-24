[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

icecult
=======
Alternative webinterface for [eiskaltdcpp-daemon](https://github.com/eiskaltdcpp/eiskaltdcpp).

Features:
* Connect to hubs
* Chat (History stored in Browser)
* Browse filelists of hub's users
* Download folders/files
* List of current/queued downloads
* Show Hash status and Upload/Download-Ratio

Planned:
* Search

Screenshots
-----------
* Hubs: ![Hubs](https://raw.github.com/eiskaltdcpp/icecult/master/screens/icecult_hubs.png)
* Browse: ![Browse](https://raw.github.com/eiskaltdcpp/icecult/master/screens/icecult_browse.png)
* Queue: ![Queue](https://raw.github.com/eiskaltdcpp/icecult/master/screens/icecult_queue.png)

License
-------
* [MIT license](/../../blob/master/LICENSE)
* Some 3rd-party libraries [here](/../../tree/master/app/libs) licensed under MIT, too

Setup
-----
* Look up [this wiki page](/../../wiki).

Contribution
------------
* Patches are welcome!
* If you need to add extra library, then:
  * check the license of that library very carefully
  * check if that library is actively maintained (for fixing possible bugs in it)
  * try to find a usual CDN server hosting the file and only if you can't find one, copy source version of javascript file into this repo

Changelog
---------
* 0.6.2:
  * bugfix: download of single files starting with "d"
  * bugfix: be more tolerant with hub's chat time formats [#23](/../../issues/23)

* 0.6.1:
  * feature: wrap long chat messages [#21](/../../issues/21)
  * feature: render urls in chat messages as links [#22](/../../issues/22)

* 0.6.0:
  * feature: desktop notifications for chat messages [#18](/../../issues/18)
  * feature: priorities for download queue [#17](/../../issues/17) / [#19](/../../issues/19)
  * feature: store enlargeable chat state [#20](/../../issues/20)

* 0.5.2:
  * feature: enlargeable chat [#15](/../../issues/15) / [#16](/../../issues/16) (thx [@mmrose](https://github.com/mmrose))
  * feature: improved ui: auto scaling chat size window, better tooltips in user list, responsive navigation
  * bugfix: only partial filelist displayed in browse view

* 0.5.1:
  * feature: updated angular to 1.3.14
  * feature: added localstorage versioning
  * bugfix: proper html escaping of chat messages [#14](/../../issues/14)

* 0.5.0:
  * feature: added settings tab
  * feature: enabled possibility to pause/resume hashing
  * feature: updated angular to 1.3.13 and bootstrap to 3.3.2
  * bugfix: another error in update check

* 0.4.1:
  * bugfix: error in update check

* 0.4.0:
  * feature: show available updates in statusbar

* 0.3.0:
  * bugfix: Chat text could be sent multiple times [#8](/../../issues/8)
  * feature: Download queue size visible in status bar [#9](/../../issues/9)
  * feature: Updated angular and bootstrap versions

* 0.2.1:
  * bugfix: Abort buttons in Download queue not functional [#7](/../../issues/7)

* 0.2.0:
  * bugfix: Update of already downloaded filelist not possible [#5](/../../issues/5)
  * bugfix: In mobile view Bootstrap's navbar collapse button without function [#4](/../../issues/4)
  * feature: Sorting users in hub view [#3](/../../issues/3)
  * feature: Show bandwidth in kBit/s [#2](/../../issues/2)

* 0.1.1:
  * feature: added queue item details button to show more information
  * feature: show daemon and client version

* 0.0.1:
  * initial version
