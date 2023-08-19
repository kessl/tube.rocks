# Pin npm packages by running ./bin/importmap

pin "application", preload: true
pin "plyr_setup", preload: true

pin "plyr", to: "https://ga.jspm.io/npm:plyr@3.7.8/dist/plyr.min.mjs", preload: true
pin "htmx.org", to: "https://unpkg.com/htmx.org@1.9.4", preload: true
