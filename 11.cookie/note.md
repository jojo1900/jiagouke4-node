## cookie & session & localStorage & sessionStorage的区别
- localStorage 本地存储 可以存储数据，好处就是可以把数据存储到本地 ，不清除就一直在 （可以存储js文件或者css文件 ， 可以做到缓存的效果）  大小限制大概就是5m. 如果存储数据量大 indexDB来存储大数据  clear()
- sessionStorage会话级别的 缓存数据  关闭就丢了。
- cookie  http默认无状态， 我们每次请求的时候都不知道是谁， 用来识别用户身份。 （如果设置了cookie每次请求都会携带cookie） 要尽可能存储必要的东西。 cookie 4k， 过大会导致页面白屏。 不能存放敏感信息。 cookie会被传输 （传输是明文的） 
- session 基于cookie的 存在服务端。 所以可以存放敏感信息 （session放在服务端内存的，会有共享问题，将sesson存储起来）

