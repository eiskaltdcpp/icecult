#!/usr/bin/env python
"""
Copyright (c) 2015 Lars Kreisz
License: The MIT License (MIT)
--

This script needs "python-twisted" installed.
It's usefull for 2 use cases:

1) Serve the webinterface
- run locally, it serves the app folder via http
- requests to "/rpc" will be proxied to the 127.0.0.1:3121 (eiskaltdaemon jsonrpc interface)

2) Development proxy
- run locally, it serves the app folder via http
- requests to "/rpc" will be proxied to the ip and port given as first parameter "<ip>:<port>"
  ( where a next proxy, f.e. nginx or another copy of this script (use case 1), proxy it into a
    running eiskalt-daemon )
"""
import argparse
import os
import textwrap

try:
    from twisted.internet import reactor
    from twisted.web import proxy, static, server
except ImportError:
    print('Install twisted, f.e. via "apt-get install python-twisted".')


# parse args
parser = argparse.ArgumentParser(formatter_class=argparse.RawDescriptionHelpFormatter,
                                 description=textwrap.dedent(__doc__))
parser.add_argument('-p', '--port', metavar='PORT', type=int, default=80,
                    help='local webinterface port [80]')
parser.add_argument('-r', '--rpc', metavar='HOST:PORT', default='127.0.0.1:3121',
                    help='host:port of the eiskalt daemon [127.0.0.1:3121]')
args = parser.parse_args()
host, port = args.rpc.split(':')
app = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'app')

# setup twisted services
root = static.File(app)
root.putChild("rpc", proxy.ReverseProxyResource(host, int(port), '/rpc'))
reactor.listenTCP(args.port, server.Site(root))

# run
print('Serving "%s" on http://localhost:%d and proxying /rpc to %s:%s...' % (app, args.port, host, port))
reactor.run()
