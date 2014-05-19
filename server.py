#!/usr/bin/env python
#
# Simple server for local development.
# - serves the app folder via http
# - requests to "/rpc" will be proxied to http://192.168.1.122
#   (where the nginx proxy it into eiskalt-daemon)
#
import os
import sys

from twisted.internet import reactor
from twisted.web import proxy, static, server

root = static.File(os.path.join(os.path.dirname(__file__), 'app'))
root.putChild("rpc", proxy.ReverseProxyResource(sys.argv[1], 80, '/rpc'))

reactor.listenTCP(80, server.Site(root))
reactor.run()
