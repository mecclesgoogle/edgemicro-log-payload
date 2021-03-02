# edgemicro-log-payload
An Apigee Edge Microgateway plugin that logs request/response payload and headers.

**Important note:** This depends on the accumulate-request and accumulate-response plugins being enabled.
Configure this plugin between those two, like in the example below.

```
...
plugins:
    sequence:
      ...
      - accumulate-request
      - log-payload
      - accumulate-response
      ...
...
```

:warning: Do not enable this plugin in PRODUCTION. This code will cause the size of log files to increase and may have an impact on performance.
