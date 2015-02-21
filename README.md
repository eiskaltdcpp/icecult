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

* Hubs: ![Hubs](https://raw.github.com/kraiz/icecult/master/screens/icecult_hubs.png)
* Browse: ![Browse](https://raw.github.com/kraiz/icecult/master/screens/icecult_browse.png)
* Queue: ![Queue](https://raw.github.com/kraiz/icecult/master/screens/icecult_queue.png)

Setup
-----

Look up [this wiki page](https://github.com/kraiz/icecult/wiki).

Changelog
---------

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
