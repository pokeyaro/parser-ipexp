# js code parser_ipexp
  
#### I. Description
- The front-end uses JavaScript to parse the IP expression into a real IP lists.
- Used to parse user input IP expressions in the <input> tag.
  
#### II. The sample used
1. Reference JS Scripts in HTML
```html
<script type="text/javascript" charset="utf-8" src="../src/parserIpexp.js"></script>
```

2. Call JS Function API in HTML
```html
<script>
    // Support Single or Multiple IP/IP Expression Strings.
    let input = "10.1.17.34, 10.10.1.1-3, 10.32.16.44";
    let result = parserIpExp(input);
    console.log(result);
</script>
```

3. Console Display
```javascript
[object Object] {
    data: ["10.1.17.34", "10.10.1.1", "10.10.1.2", "10.10.1.3", "10.32.16.44"],
    state: true
}
```

4. Some Error Demo
```javascript
--------------------------------------------
parserIpExp("192.168.1.265");                   // An invalid ipv4 address.
parserIpExp("192.168.1.10-1");                  // Currently only supports from small to large.
parserIpExp("192.168.[1-10].1");                // Currently only supports the continuity of the 4th ip segment.
parserIpExp("192.168.1.1-192.168.1.10");        // This syntax is not currently supported.
--------------------------------------------
[object Object] {
    data: [],
    state: false
}
--------------------------------------------
```

#### III. Demo screenshot
![pic](/assets/img/screenshot-demo.png "demo.html")

#### IV. Notes
CDN online jquery 3.3.1 library is referenced in the example.
  
#### V. Version
v1.0.0
  
