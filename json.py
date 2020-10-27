import json
from typing import Dict


def recursive_nested_json(json_string: str, prev_key: str, output: Dict[str, str] = None) -> Dict[str, str]:
    try:
        json_obj = json.loads(json_string)
        for key, val in json_obj.items():
            new_key = f'{prev_key}.{key}' if (prev_key != "" or prev_key) else key
            if isinstance(val, dict):
                recursive_nested_json(json_string=json.dumps(val, separators=(',', ':')), prev_key=new_key, output=output)
            else:
                output[new_key] = val
        return output
    except:
        return {}

json_string = '{"parameters":{"personal_information":{"last_name":"Proulx","first_name":"Shawn","date_of_birth":null}}}'
print ('Here is the output')
print(recursive_nested_json(json_string=json_string, prev_key="", output={}))