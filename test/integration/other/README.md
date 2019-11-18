# Other Integration Tests

This directory holds stand-alone integration tests that should not be part of
the integration test suite.

An example of a test that fits this criteria are rate limit tests. Rate limit
tests are complex, require a solid internet connection, and can easily disrupt
other tests. For those reasons, it is better to run them on their own. 
