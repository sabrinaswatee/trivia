Test Frameworks
===============

This repo has configuration and example files for both RSpec and minitest. The
RSpec files are in `/spec` and the minitest files are in `/test`.

First install both of the gems using Bundler (don't worry, you'll only be
using one at a time):

    bundle install

You can run the RSpec tests using:

    rake spec

And the minitest test using:

    rake minitest

Please modify any and all of these files to suit your preferences; these are
simply meant as a starting point!

Golden Master tests
===================

To generate the golden master files, run the following rake task:

```bash
bundle exec rake create-golden-master
```

The task will create reference output files in `spec/golden_master` folder.

To comapre the output of the game against the golden master, run the specs:

```bash
bundle exec rake spec
```

