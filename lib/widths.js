import {Buffer} from 'buffer';
import {UnicodeTrie} from '@cto.af/unicode-trie';

export const version = '15.1.0';
export const inputFileDate = new Date('2023-08-07T15:21:24.000Z');
export const generatedDate = new Date('2023-10-31T21:48:03.856Z');
export const Width = new UnicodeTrie(Buffer.from(
  `AAARAAAAAADdBAAAGx95MJ4Jts2CbayTN4fNM46QZNYkOuxSYVLDW/NhMQCg4RGrqw3eF0CA
   3zf3r75iPxuzBfeNQFCmQlKKIDQq1Gne7H2YLdHxPd+ZqkpV6atnkkK2iBHgy+757zT5Pgge
   BMEgCAaDIBgEwYVgcOHC9ymSg2JUow+GYAymYA6WYA22QKAKO9sPEo5OPYsruIMneIMX+IAv
   +HNWzmrQgQkszjhYFKa4ytGeJgJqK69jhr+xQqk9TmEsxTUNPsuKniWq0nb7gHH2hC/gOu7j
   Gd7iC357WVShDWNYn3ECO+JFIJt1ifBK+5N8bVXF4+clwxS8VwYKUI56tKOpemAAI5jADBaw
   gvVsZz/HOY+t+9Sppg9d7x27j0JuHzn0zHM8fcJ3OHzxG77lpDD/4xaUBv66QMxob8R2pfQC
   MOOAVvGaI48Jvebo3BuVcdIwGLHIN0QIzZgZjd7g9MhjIVZg9XecUP6Y7UkiQrnL+zrBdzOH
   uD/PqL7hHzjkX93XC5tTH7CFJzdcxgfv8bVjw8Xm60kxofOQ4Se8BbhwVuPPwIA1NN+2JbVi
   bHDEmCS/p04fuw3NVbFu/7vf4XVS6lpm5N1O61c6dabU1w35hUvEgN+6jprEVyop4it/d/CN
   EUIqvTE2wjUC82me65OTE1yvbXhfE+l9LvyT7RsVn3To2zflWHpqWi4je66zIspRFwZVGEjX
   0JaJLnm+PjEwTzQ84zOt5nvWPL80a7H1uti3F0cP7eX2E6W70BIOXQP24R6e4DU+PT2wv1pn
   qN07yStXo2ULYwYV4AXvikXtOzbf8u712XfNBzda0XSvEF6o/2/JFfAvza5kZdEf/i9kDELZ
   qJUBvF9SqoGUOqFfLsG9UGkH8hQwy8eVTg1Bn2yQ42KVlkhKA7D98JyBYU1uUWyVMFU+l831
   YQoLvgl+N60wz6qWbQ4Sz+UeE/bAJr3PcbJvUyQ0P6Su0Psau/Qup6mdVAl58WTyMj5iod00
   gpP411H7NR2IT72wnkGyt0LN4s5+mY4A7LtNvRPWvYjJPG+ZVpGkDMRQsgZ+noek74hjSkhd
   JjmKQKRwuea9CKqssZrPlp9s/TGDEvVYhzMA+nkWGglzhFBGurrqLnJAHf6rBIgM+/o9sO9p
   wHCdIQq7Lnqgi8WEuypfPmuOJvFsZbGlVDh0LxaXyXjX8uk1gfcJgExTZagUsEQSkY5Ef7jl
   iylHGEodKAtuOlAbjqNTLgBPHJMXPisJDBQb7BdOz4QeLCF9ivAfovyoCYnzpePZSJ4FxvTu
   l6NpJHVMPpw6gaQGHgTb0A9PyA/60o5+wFlNoldsPeTEw1RAAoQCawVlcPdsGAR5GFYukbaL
   yN8BrdecL6GqmJxaulb55GYCnsU4rl/d4hj++MpQpL5ymOQQDVAb4lVzlfg/C+lTT5Uy3z/z
   0xO0DDsQer19UYs6SJUaoYc2JX8pDuY4GXwRqv1EUyguJodwIAkyTMXgIK4FPo7IQPF2LxDk
   skFBTZPZemCxkYehfbEPR6YHRKCBXO3UaYqYWM+iUjDvmNJ5UAZezBWLCV2kGBhK2mhsiM4t
   K8rBHWV0D0NgN7Qtrul3JY5jPqR/jDVzqZODfNDVabAeMZNj5l9MPjI4mEIZOORpIDij9FGv
   qM3mG0kY5uUM2UHl/g0DiwCAW10D`,
  'base64'
));

/**
 * @type {Record<string, number>}
 */
export const names = Object.fromEntries(
  Width.values.map((v, i) => [v, i])
);
export const {values} = Width;
