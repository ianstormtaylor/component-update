# component-update

  A component command plugin to update out of date dependencies

## Installation
  
    $ npm install -g component-update

## Example

    $ component update

            updated : component/jquery       1.8.8  ->  1.9.1
            updated : component/tip          0.2.0  ->  0.2.1
            updated : ianstormtaylor/reset   0.1.0  ->  0.1.1

  Optionally pin dependencies too:

    $ component update --pin

            updated : component/each             *  ->  0.1.0
            updated : component/model            *  ->  0.1.1
            updated : component/jquery       1.8.8  ->  1.9.1
            updated : component/tip          0.2.0  ->  0.2.1
            updated : ianstormtaylor/reset   0.1.0  ->  0.1.1

## License
  
  MIT
