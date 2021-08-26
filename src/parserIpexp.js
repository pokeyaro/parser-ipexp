/**
 * Function description
 *
 * Judging the validity of IPv4.
 *
 * @param  {String}  Incoming Params: e.g. "255.255.255.0"
 * @return {Bool}    Return Value: Return True or False
 */
function isValidIp(ip) {
    let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    return reg.test(ip);
}

/**
 * Function description
 *
 * Judging the validity of IP Expression.
 *
 * @param  {String}  Incoming Params: e.g. "192.168.1.100-146"
 * @return {Bool}    Return Value: Return True or False
 */
function isValidIpExp(ipexp) {
    let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])-(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    let bool = reg.test(ipexp);
    if (bool) {
        let arr = ipexp.split(/[.]|-/);
        let end_num = arr.pop();
        let front_num = arr.slice(-1);
        // IP expression writing specification: The number after the horizontal line needs to be greater than the number in front
        if (parseInt(end_num) > parseInt(front_num)) {
            return true;
        }
        return false;
    }
    return false;
}

/**
 * Function description
 *
 * Parse the IP Expression into a real ip lists.
 *
 * @param  {String}  Incoming Params: e.g. "192.168.1.100-146"
 * @return {Array}   Return Value: Correctly return the complete ip array, Error returns an empty array.
 */
function convertIpList(ipexp) {
    var ips_arr = new Array();
    // Disassemble the ip segment
    let ip_segs = ipexp.split(/[.]|-/);
    // Single ip
    if (ip_segs.length == 4 && ipexp.indexOf("-") == -1) {
        ips_arr.push(ipexp.trim());
    // Single ip-exp
    } else if (ip_segs.length == 5 && ipexp.indexOf("-") != -1) {
        let seg1_3 = ip_segs.slice(0,3).join(".");
        let seg4_begin = parseInt(ip_segs[ip_segs.length-2]);
        let seg4_end = parseInt(ip_segs[ip_segs.length-1]);
        // Parse the real ip
        for (var i = seg4_begin; i <= seg4_end; i++) {
            // Add elements to the list
            ips_arr.push(seg1_3 + "." + i);
        }
    }
    // Return ip data list
    return ips_arr;
}

/**
 * Function description
 *
 * Parse multi-entry IP Expression string.
 *
 * @param  {String}  Incoming Params: e.g. "10.1.1.1-5, 10.217.30.56, 192.168.1.100-146, 10.130.77.254"
 * @return {Object}  Return Value: key-value obj["data"] return array or empty array, obj["state"] return True or False.
 */
function parserIpExp(ipstr) {
    // [Define constant] Divide according to comma
    const ip_split = ipstr.split(",");
    // [Definition string] Construct an empty string object
    var single_ipval = new String();
    // [Definition Json] Construct a Key-Value object to store the result
    var json_data = {
        "state": false,
        "data": [],
    };
    // [Define function] Single ip expression analysis
    function checkOutput(ipval) {
        // Verify a single ip, there is no '-' situation
        if (ipval.indexOf("-") == -1) {
            if (!isValidIp(ipval)) {
                return false;
            }
        // Verify a single ip expression, including '-' situation
        } else {
            if (!isValidIpExp(ipval)) {        
                return false;
            }
        }
        // Output ip array result
        return convertIpList(ipval);
    }
    // Only the value of a single expression
    if (ip_split.length == 1) {
        // Remove leading and trailing spaces
        single_ipval = ip_split[0].replace(/\s+/g, "");
        // Handling single ip expressions
        let check_res = checkOutput(single_ipval);
        if (check_res) {
            json_data = {
                "state": true,
                "data": check_res,
            };
        }
        // Correct or incorrect output
        return json_data;
    // The value of multiple expressions
    } else {
        // Parse the element value of a single ip string
        let ip_list = new Array();
        for (var i = 0; i < ip_split.length; i++) {
            single_ipval = ip_split[i].replace(/\s+/g, "");
            ip_list.push(single_ipval);
        }
        // Array summarizing all ip lists
        let ip_collect = new Array();
        for (var i = 0; i < ip_list.length; i++) {
            single_ipval = ip_list[i];
            // Store verification results
            let check_res = checkOutput(single_ipval);
            // Incorrect output
            if (!check_res) {
                return json_data;
            }
            // Merge array：apply method using push function instance
            ip_collect.push.apply(ip_collect, check_res);
        }
        json_data = {
            "state": true,
            "data": ip_collect,
        };
        // Correct output
        return json_data;
    }
}

