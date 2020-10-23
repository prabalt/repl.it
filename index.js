function parse_each_json_element(json) {
    try {
        obj = JSON.parse(json);
        var outputarray = new Array();
        var i = 0;
        for (var key in obj){
            outputarray[i] = JSON.stringify({"key": key, "value": obj[key]});
            i++;
        }
        return outputarray;
    } catch (e) { // handle unparsable jsons
        return null;
    }
}

function recursive_nested_json(json_string, prev_key, output){
    try {
        json_obj = JSON.parse(json_string);
        for (let key in json_obj) {
            val = json_obj[key];
            new_key = (prev_key != "") ? `${prev_key}.${key}` : key;
            if (val instanceof Object) {
                output = recursive_nested_json_2(json_string=JSON.stringify(val), prev_key=new_key, output=output);
            }
            else {
                output[new_key] = val;
            }
        }
        return output;
    }
    catch (e) {
        return null;
    }
}

//to use as bigquery udf
function recursive_nested_json_2(json_string){
  function run_recursive_nested_json(json_string, prev_key, output) {
      try {
          json_obj = JSON.parse(json_string);
          for (let key in json_obj) {
              val = json_obj[key];
              new_key = (prev_key != "") ? `${prev_key}.${key}` : key;
              if (val instanceof Object) {
                  output = recursive_nested_json_2(json_string=JSON.stringify(val), prev_key=new_key, output=output);
              }
              else {
                  output[new_key] = val;
              }
          }
          return output;
      }
      catch (e) {
          return null;
      }
  }
  output = {};
  run_recursive_nested_json(json_string=json_string, prev_key="", output=output);
  return JSON.stringify(output)
  // return output
}

var json_string = '{"parameters":{"personal_information":{"last_name":"Proulx","first_name":"Shawn","date_of_birth":null}}}';
// console.log(parse_each_json_element(json_string))
output = {};
console.log(recursive_nested_json(json_string=json_string, prev_key="", output=output));
console.log(recursive_nested_json_2(json_string=json_string, prev_key="", output=output));



