import axios from "axios";
import CryptoJS from 'crypto-js';

const baseUrl = "https://api.oneprawnandco.com/saccapital";
const version = '/v1/';

const baseUrl_singpass = "https://sacapistaging.saccapital.com.sg/sacapistaging/home";
const baseUrl_myinfosingpass = "https://sacapistaging.saccapital.com.sg/sacapistaging/myauth/home";
const version_singpass = '/v1/';
export default {
  data() {
    return {
      response: null,
      postresponse: null,
      secret_key:'sajidul',
      m_baseUrl: "https://api.oneprawnandco.com/saccapital",
      m_version:'/v1/',
      notification_number_value:0
    }
  },
  methods: {
    globalgetBaseurl:function(){
      return baseUrl+version;
    },
  //  globalHelper: function (e) {
   //   console.log(e.currentTarget.getAttribute('data-id'))
   //   alert('test');
  //  },
    globalGet: async function (endpoint) {
      // without auth
      try {

        const roles = await axios.get(baseUrl + endpoint);
        
        const rolesdata = roles.data;
        this.response = rolesdata;
        
      }
      catch (e) {
        console.error(e);
      }
    },
    globalGet_singpass_url: function(){
      return  baseUrl_singpass;
   },
   globalGet_myingosingpass_url: function(){
    return  baseUrl_myinfosingpass;
 },
    globalGetreversion_singpass: async function(endpoint){
      return  await axios.get(baseUrl_singpass + version_singpass + endpoint);
   },
    globalGetreversion: async function(endpoint){
       return  await axios.get(baseUrl + version + endpoint);
    },
    globalGetre: async function(endpoint){
      return  await axios.get(baseUrl + endpoint);
    },
    globalPost: async function (endpoint, postdata) {
         // without auth
         return  await axios.post(baseUrl + endpoint, postdata);
   
    },
    global_ver_Post: async function (endpoint, postdata) {
      // without auth
      return  await axios.post(baseUrl +version + endpoint, postdata);

 },
    globalotp: async function(endpoint){
      return await axios.get(baseUrl + endpoint);
    },
    successfulllogin: function(response_data){
    
      var user_info = JSON.stringify(response_data.data.response);
      var token_number = JSON.stringify({'jwt-token':response_data.data.response.jwtToken});
  
      localStorage.setItem('userdata', user_info);   
      localStorage.setItem('token', token_number);
      localStorage.setItem('authlogin', true); 
     JSON.parse(localStorage.token);
     /*create check user profile completed */
     return response_data.data.response.id;
    
    },
    checkuserlogin:function(){
      if(localStorage.authlogin){
        this.userlogin = true;
      }
      else{
        this.userlogin = false;
       // localStorage.clear();
      }
    },
    removeLocakey:function(key){
      if(Array.isArray(key)){
        for (let x in key) {
          localStorage.removeItem(key[x]); 
        }
      }
      else{
        localStorage.removeItem(key); 
      }
    },
    getlocalkey:function(key){
      var token_json = localStorage.getItem(key) 
      token_json = JSON.parse(token_json);
      return token_json;
    },
    getlocalkey_withoutjson:function(key){
      var token_value = localStorage.getItem(key) 
        return token_value;
    },
    showpassword: function(field){
      var fieldname ='';
			if (field == "password") {
        fieldname = "text";
        return fieldname;
      } else {
        fieldname = "password";
        return fieldname
    }
		},
    setvalueinlocalstroage:function(key,value){
      value = JSON.stringify(value);
      localStorage.setItem(key, value);   
    },
    setvalueinlocalstroage_all:function(key,value){
          localStorage.setItem(key, value);   
    },
    checkloginstatus: function(){
      if(localStorage.authlogin){
        return true;
      }
      else{
       return false;
        
      }
    },
    globalGetreauth: async function(endpoint){
      var token_json = JSON.parse(localStorage.token);
       var token = token_json['jwt-token']; 

      return  await axios.get(baseUrl + version + endpoint,{
        headers: {
          'Authorization': 'Bearer '+token
        },
     });
    },
    globalgetdata: async function(endpoint){
      return await axios.get(baseUrl+ version + endpoint);
    },
    showregmodal:function(name = null){
  
      if(!this.checkloginstatus()){
     
        var get_optel = document.querySelector("#signup_popup"); 
					get_optel.click();
      }
      else if(name !=null){
        this.$router.push({ name: name })
      }
       },
       globalputauth: async function(endpoint , postdata){
        var token_json = JSON.parse(localStorage.token);
         var token = token_json['jwt-token']; 
    
        return  await axios.put(baseUrl + version + endpoint,postdata,{
          headers: {
            'Authorization': 'Bearer '+token
          },
       });
      },
      globalpostauth: async function(endpoint , postdata){
        var token_json = JSON.parse(localStorage.token);
         var token = token_json['jwt-token']; 
    
        return  await axios.post(baseUrl + version + endpoint,postdata,{
          headers: {
            'Authorization': 'Bearer '+token
          },
       });
      },
      /* fatch api */
      globalfatch: async function(endpoint){
        fetch(baseUrl + endpoint, { method: "GET", mode: 'cors', headers: { 'Content-Type': 'application/json',}}).then(response => response.json()).then(data => console.log(data));
      },
 
  // session stroage 

  setvalueinsessiosstroage:function(key,value){
    value = JSON.stringify(value);
    sessionStorage.setItem(key, value);   
  },
  removesessionkey:function(key){
    if(Array.isArray(key)){
      for (let x in key) {
        sessionStorage.removeItem(key[x]); 
      }
    }
    else{
      sessionStorage.removeItem(key); 
    }
  },
  getkeyexistsession:function(key){
    if (sessionStorage.getItem(key) === null) {
      return null
    }
    else{
      return this.getsessionkey(key);
    }
  },
  getsessionkey:function(key){
    var token_json = sessionStorage.getItem(key) 
    token_json = JSON.parse(token_json);
    return token_json;
  },
  encryptdata:function(data) {
    
    if (data.length) {
      const data_secrect = CryptoJS.AES.encrypt(data, this.secret_key).toString();
      
     return data_secrect;
    }
  },

  decryptData:function(endata) {
    const decryptData = CryptoJS.AES.decrypt(
      endata,
      this.secret_key
    ).toString(CryptoJS.enc.Utf8);
    return decryptData;
  },
rendomNumber:function(len){
  return Math.random().toString(36).substring(2,len+2);
},
successfulllogin_tem: function(response_data){
    
  var user_info = JSON.stringify(response_data.data.response);
  var token_number = JSON.stringify(response_data.headers);
  

  sessionStorage.setItem('userdata', user_info);   
  sessionStorage.setItem('token', token_number);
  sessionStorage.setItem('authlogin', true); 
 JSON.parse(sessionStorage.token);

},
saveregistration_token:function(response_data){
  var user_info = JSON.stringify(response_data);
  var token_number = response_data.jwtToken;
 

  sessionStorage.setItem('userdata', user_info);   
  sessionStorage.setItem('token', token_number);
  sessionStorage.setItem('authlogin', true); 
 
},

saveregistration_data:function(key,data){
  sessionStorage.setItem(key, data); 
},
globalPostreauth_onetime: async function(endpoint , postdata){
  var token;
  if(localStorage.authlogin){
    //checklogin
    token = JSON.parse(localStorage.token);
    
  }
  else{
    //temp login
  
    var token_json = sessionStorage.token;
    if(!sessionStorage.token){
    
      token_json = localStorage.temp_token
    }
    
    token = token_json; 
    
  }
 


  return  await axios.post(baseUrl + version + endpoint,postdata,{
    headers: {
      'Authorization': 'Bearer '+token
    },
 });
},
setsessionkeydatak: function(key,value){
  sessionStorage.setItem(key, value);  
},
globalGetreauth_onetime: async function(endpoint){
 //GET

  var token;
if(localStorage.authlogin){
  //checklogin
  token = JSON.parse(localStorage.token);
  
}
else{
  //temp login

  var token_json = sessionStorage.token;
  if(!sessionStorage.token){
    
    token_json = localStorage.temp_token
  }
 
  token = token_json; 
}

  return  await axios.get(baseUrl + version + endpoint,{
    headers: {
      'Authorization': 'Bearer '+token
    },
 });
},
globalgetsessionkeyvalue: function(key){
  var value = sessionStorage[key];
  if(value == null && key == 'role_id'){
    value = localStorage['temp_'+key];
    value =  value.replace('"', ''); 
    value =  value.replace('"', ''); 
  }
  return value;
},
globalfileupload_oneregistration: async function(endpoint,formdata){
  //POST
  var token;
  if(localStorage.authlogin){
    //checklogin
    token = JSON.parse(localStorage.token);
    
  }
  else{
    //temp login
  
    var token_json = sessionStorage.token;
    if(!sessionStorage.token){
    
      token_json = localStorage.temp_token
    }
   
    token = token_json;  
  }
 
   return  await axios.post(baseUrl + version + endpoint,formdata,{
     headers: {
       'Authorization': 'Bearer '+token
     },
  });
 },
globalfileupload: async function(endpoint,formdata){
 //POST
  var token_json;
  var token
if(localStorage.authlogin){
   //checklogin
  token_json = JSON.parse(localStorage.token);
  token = token_json['jwt-token']; 
}
else{
  //temp login
  token_json = JSON.parse(sessionStorage.token);
  token = token_json['jwt-token']; 
}

  return  await axios.post(baseUrl + version + endpoint,formdata,{
    headers: {
      'Authorization': 'Bearer '+token
    },
 });
},
inWord: function(num){
  var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
  if ((num = num.toString()).length > 9) return 'overflow';
 var  n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return; var str = '';
  str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
  str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
  str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
  str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
  str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
  return str;
},
checkkeyexistlocalstrore:function(key){
  if (localStorage.getItem(key) === null) {
    return null
  }
  else{
    return this.getlocalkey(key);
  }
},
checkkeyexistlocalstrorewithjson:function(key){
  if (localStorage.getItem(key) === null) {
    return null
  }
  else{
    var value = this.getlocalkey_withoutjson(key);
    value =  value.replace('"', ''); 
    value =  value.replace('"', ''); 
    return value;
  }
},
checktemloginorother:function(key,other="userdata"){
  //check login exit
  var sess_token = this.getkeyexistsession(key);
  if(sess_token !=null){
    //session login
    return this.getkeyexistsession(other);
  }else{
    //normal login
    var reg_details_out = this.getlocalkey('reg_details_without_verify');
    this.setvalueinsessiosstroage('reg_details_without_verify',reg_details_out)
    return this.checkkeyexistlocalstrore(other);
  }
},
getuserid:function(){
  var userdata = this.getlocalkey('userdata');
  var user_id = userdata.id;
  return user_id;
},
hasNumber:function(myString) {
  return /\d/.test(myString);
},
f_test_all:function(labelValue){
console.log(labelValue);
}
,
convertToInternationalCurrencySystem:function(labelValue) {

  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e+9

  ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"
  // Six Zeroes for Millions 
  : Math.abs(Number(labelValue)) >= 1.0e+6

  ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
  // Three Zeroes for Thousands
  : Math.abs(Number(labelValue)) >= 1.0e+3

  ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"

  : Math.abs(Number(labelValue));

},
data_submit:function(end_point_url,type,post_value=null){
  if(type == 'post'){
     
          //with post data
          this.globalpostauth(end_point_url,post_value).then((result_other) => {
              console.log(result_other);
          }).catch((error) => {
    if (error.response) {
      //do something
      this.errors.push(error.response.data.message);
    }
    else if (error.request) {
      //do something else
      
    } else if (error.message) {
      //do something other than the other two
    }
  });

     
      }else{

          this.globalGetreauth(end_point_url).then((result_other) => {
              console.log(result_other);
           return result_other.data;
          }).catch((error) => {
    if (error.response) {
      //do something
      this.errors.push(error.response.data.message);
    }
    else if (error.request) {
      //do something else
      
    } else if (error.message) {
      //do something other than the other two
    }
  });

      }
},
convert_number_other:function(value){
 if(!isNaN(value)){
  var co_dat = this.convertToInternationalCurrencySystem(value);
  co_dat = co_dat.toString();
  co_dat = co_dat.replace(/\.00([^\d])/g,'$1');
  return co_dat;
}else{
  return 'TBD';
}
},
//new code sec
base64urldecode:function(str) {
  const base64Encoded = str.replace(/-/g, '+').replace(/_/g, '/');
  const padding = str.length % 4 === 0 ? '' : '='.repeat(4 - (str.length % 4));
  const base64WithPadding = base64Encoded + padding;
  return atob(base64WithPadding)
    .split('')
    .map(char => String.fromCharCode(char.charCodeAt(0)));
},
isJson:function(str) {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
},
//end new code 
cal_data_su(num_one,num_two,type){
 
  var result;
  num_one = parseFloat(num_one);
  num_two = parseFloat(num_two);
  if(type == 'sum'){
    result =num_one+num_two;
  }
  else if(type == 'sub'){
    result =num_one-num_two;
  }
  else if(type == 'mul'){
    result =num_one*num_two;
  }
  else{
    result =num_one/num_two;
  }
  return result;
},
get_number_of_string:function(value,length_v=2){
  
  var final_dat= value.substring(0, length_v );
  return final_dat;
},
get_myinfo_name:function(obj_item,key){
 
   var name = obj_item[key];
   
   var myString = name.value;
   var myArray = myString.split(" ");
   var re_json = null;
   if(myArray.length == 3){
    re_json = {
      firstname: myArray[0],
      middlename: myArray[1],
      lastname: myArray[2],
    }
   }else{
    re_json = {
      firstname: myArray[0],
      lastname: myArray[1]
    }
   }
  
   
   return re_json;
    
},
get_myinfo_dob:function(obj_item,key){
  var dob = obj_item[key];
  return dob.value;
  
},
get_myinfo_birthcountry:function(obj_item,key){
  var dob = obj_item[key];
  return dob.desc;
  
},
get_myinfo_sex:function(obj_item,key){
  var dob = obj_item[key];
  var r_val = 'Mr';
  if(dob.code == 'F' && obj_item['marital'].desc == 'MARRIED'){
    r_val = 'Mrs';
  }
  if(dob.code == 'F' && obj_item['marital'].desc != 'MARRIED'){
    r_val = 'Miss';
  }
  return r_val;
  
},
get_myinfo_nationality:function(obj_item,key){
  var dob = obj_item[key];
  if(dob.code == 'SG'){
    return 1;
  }else{
    return 2;
  }
  
  
},
get_myinfo_residentialstatus:function(obj_item,key){
  var dob = obj_item[key];
  if(dob.code == 'C'){
    return 'Singapore';
  }else{
    return null;
  }
  
  
},
get_myinfo_noa(obj_item,key,amount){
  var noa = obj_item[key];
  var current_year = new Date().getFullYear();
   var updateyear =  noa.lastupdated.split('-');
   var send_value = false;
   if(current_year == updateyear[0]){
    
    for (let x in noa.noas) {
      
      if(amount <= noa.noas[x].amount.value){
        send_value = true;
      }else{
        send_value = false;
      }
    }
   }
   return send_value;
},
get_myinfo_regadd:function(obj_item,key){
  var regadd = obj_item[key];
  var regadd_details = {
    postalcode:regadd.postal.value,
    unit:regadd.floor.value+','+regadd.unit.value,
    street:regadd.street.value,
  };
  
  return regadd_details;
  
},
finlallocationcal(total,sale){
  var pr_a = (parseInt(sale)*100)/parseInt(total);

  return 'width: '+pr_a+'%';
},
calulationfinalshare(numbershare,issueprice){
  issueprice = parseFloat(issueprice);
  numbershare = parseInt(numbershare);
  var total = issueprice*numbershare;
  return total;
},
calulationparct(amount,par){
  amount = parseFloat(amount);
  par = parseFloat(par);
  var to_p = amount*par/100;
  return to_p;
},
calulationtotal_submit_investment(total,placement_free,gst,trsn_free){
  total = parseFloat(total);
  placement_free = parseFloat(placement_free);
  gst = parseFloat(gst);
  trsn_free = parseFloat(trsn_free);
  var total_amount = total+placement_free+gst+trsn_free;
  return total_amount;
},
compare_date(date1,currentDate){
  var result = false;
  if(date1 > currentDate){
    result = true;
   // console.log(`${d2} is greater than ${d1}`)
    
} else if(date1 < currentDate){
  result = false;
    
} else{
  result = true;
    
}
return result;
},
checking_investment_data(key){
  console.log(key);
 var investment = this.getlocalkey('investment_tem');
 console.log(investment[key]);
 const containsKey = (investment, key ) => Object.keys(investment).includes(key);
 if (containsKey) {
return 1;
 }else{
  2
 }

},
getAllcountry_list(){
  var countries = [
      {iso: "SGP", name: "Singapore", phonecode: "+65"},
      {iso: "DZA", name: "Algeria", phonecode: "+213"},
      {iso: "AGO", name: "Angola", phonecode: "+244"},
      {iso: "AIA", name: "Anguilla", phonecode: "+1264"},
      {iso: "ATG", name: "Antigua", phonecode: "+1268"},
      {iso: "ATG", name: "Antigua Barbuda", phonecode: "+1268"},
      {iso: "ARG", name: "Argentina", phonecode: "+54"},
      {iso: "ARM", name: "Armenia", phonecode: "+374"},
      {iso: "BHR", name: "Bahrain", phonecode: "+374"},
      {iso: "BGD", name: "Bangladesh", phonecode: "+88"},
      {iso: "BRB", name: "Barbados", phonecode: "+1246"},
      {iso: "BLR", name: "Belarus", phonecode: "+375"},
      {iso: "BLZ", name: "Belize", phonecode: "+501"},
      {iso: "BEN", name: "Benin", phonecode: "+229"},
      {iso: "BMU", name: "Bermuda", phonecode: "+1441"},
      {iso: "BTN", name: "Bhutan", phonecode: "+975"},
      {iso: "BOL", name: "Bolivia", phonecode: "+591"},
      {iso: "BIH", name: "Bosnia Herzegovina", phonecode: "+387"},
      {iso: "BWA", name: "Botswana", phonecode: "+267"},
      {iso: "BRA", name: "Brazil", phonecode: "+55"},
      {iso: "BRN", name: "Brunei", phonecode: "+673"},
      {iso: "BGR", name: "Bulgaria", phonecode: "+359"},
      {iso: "BFA", name: "Burkina Faso", phonecode: "+226"},
      {iso: "BDI", name: "Burundi", phonecode: "+257"},
      {iso: "KHM", name: "Cambodia", phonecode: "+855"},
      {iso: "CMR", name: "Cameroon", phonecode: "+237"},
      {iso: "CAN", name: "Canada", phonecode: "+1"},
      {iso: "CPV", name: "Cape Verde Islands", phonecode: "+238"},
      {iso: "CYM", name: "Cayman Islands", phonecode: "+1345"},
      {iso: "CAF", name: "Central African Republic", phonecode: "+236"},
      {iso: "CHL", name: "Chile", phonecode: "+56"},
      {iso: "CHN", name: "China", phonecode: "+86"},
      {iso: "COL", name: "Colombia", phonecode: "+57"},
      {iso: "COM", name: "Comoros", phonecode: "+269"},
      {iso: "COG", name: "Congo", phonecode: "+242"},
      {iso: "COK", name: "Cook Islands", phonecode: "+682"},
      {iso: "CRI", name: "Costa Rica", phonecode: "+506"},
      {iso: "HRV", name: "Croatia", phonecode: "+385"},
      {iso: "CUB", name: "Cuba", phonecode: "+53"},
      {iso: "CYP", name: "Cyprus North", phonecode: "+90392"},
      {iso: "CYP", name: "Cyprus South", phonecode: "+357"},
      {iso: "CZE", name: "Czech Republic", phonecode: "+42"},
      {iso: "DNK", name: "Denmark", phonecode: "+45"},
      {iso: "DJI", name: "Djibouti", phonecode: "+253"},
      {iso: "DMA", name: "Dominica", phonecode: "+1809"},
      {iso: "DOM", name: "Dominican Republic", phonecode: "+1809"},
      {iso: "ECU", name: "Ecuador", phonecode: "+593"},
      {iso: "EGY", name: "Egypt", phonecode: "+20"},
      {iso: "SLV", name: "El Salvador", phonecode: "+503"},
      {iso: "GNQ", name: "Equatorial Guinea", phonecode: "+240"},
      {iso: "ERI", name: "Eritrea", phonecode: "+291"},
      {iso: "EST", name: "Estonia", phonecode: "+372"},
      {iso: "ETH", name: "Ethiopia", phonecode: "+251"},
      {iso: "FLK", name: "Falkland Islands", phonecode: "+500"},
      {iso: "FRO", name: "Faroe Islands", phonecode: "+298"},
      {iso: "FJI", name: "Fiji", phonecode: "+679"},
      {iso: "FIN", name: "Finland", phonecode: "+358"},
      {iso: "FRA", name: "France", phonecode: "+33"},
      {iso: "GUF", name: "French Guiana", phonecode: "+594"},
      {iso: "PYF", name: "French Polynesia", phonecode: "+689"},
      {iso: "GAB", name: "Gabon", phonecode: "+241"},
      {iso: "GMB", name: "Gambia", phonecode: "+220"},
      {iso: "GEO", name: "Georgia", phonecode: "+7880"},
      {iso: "DEU", name: "Germany", phonecode: "+49"},
      {iso: "GHA", name: "Ghana", phonecode: "+233"},
      {iso: "GIB", name: "Gibraltar", phonecode: "+350"},
      {iso: "GRC", name: "Greece", phonecode: "+30"},
      {iso: "GRL", name: "Greenland", phonecode: "+299"},
      {iso: "GRD", name: "Grenada", phonecode: "+1473"},
      {iso: "GLP", name: "Guadeloupe", phonecode: "+590"},
      {iso: "GUM", name: "Guam", phonecode: "+671"},
      {iso: "GTM", name: "Guatemala", phonecode: "+502"},
      {iso: "GIN", name: "Guinea", phonecode: "+224"},
      {iso: "GNB", name: "Guinea - Bissau", phonecode: "+245"},
      {iso: "GUY", name: "Guyana", phonecode: "+592"},
      {iso: "HTI", name: "Haiti", phonecode: "+509"},
      {iso: "HND", name: "Honduras", phonecode: "+504"},
      {iso: "HKG", name: "Hong Kong", phonecode: "+852"},
      {iso: "HUN", name: "Hungary", phonecode: "+36"},
      {iso: "ISL", name: "Iceland", phonecode: "+354"},
      {iso: "IND", name: "India", phonecode: "+91"},
      {iso: "IDN", name: "Indonesia", phonecode: "+62"},
      {iso: "IRN", name: "Iran", phonecode: "+98"},
      {iso: "IRQ", name: "Iraq", phonecode: "+964"},
      {iso: "IRL", name: "Ireland", phonecode: "+353"},
      {iso: "ISR", name: "Israel", phonecode: "+972"},
      {iso: "ITA", name: "Italy", phonecode: "+39"},
      {iso: "JAM", name: "Jamaica", phonecode: "+1876"},
      {iso: "JPN", name: "Japan", phonecode: "+81"},
      {iso: "JOR", name: "Jordan", phonecode: "+962"},
      {iso: "KAZ", name: "Kazakhstan", phonecode: "+7"},
      {iso: "KEN", name: "Kenya", phonecode: "+254"},
      {iso: "KIR", name: "Kiribati", phonecode: "+686"},
      {iso: "PRK", name: "Korea North", phonecode: "+850"},
      {iso: "KOR", name: "Korea South", phonecode: "+82"},
      {iso: "KWT", name: "Kuwait", phonecode: "+965"},
      {iso: "KGZ", name: "Kyrgyzstan", phonecode: "+996"},
      {iso: "LAO", name: "Laos", phonecode: "+856"},
      {iso: "LVA", name: "Latvia", phonecode: "+371"},
      {iso: "LBN", name: "Lebanon", phonecode: "+961"},
      {iso: "LSO", name: "Lesotho", phonecode: "+266"},
      {iso: "LBR", name: "Liberia", phonecode: "+231"},
      {iso: "LBY", name: "Libya", phonecode: "+218"},
      {iso: "LIE", name: "Liechtenstein", phonecode: "+417"},
      {iso: "LTU", name: "Lithuania", phonecode: "+370"},
      {iso: "LUX", name: "Luxembourg", phonecode: "+352"},
      {iso: "MAC", name: "Macao", phonecode: "+853"},
      {iso: "MKD", name: "Macedonia", phonecode: "+389"},
      {iso: "MDG", name: "Madagascar", phonecode: "+261"},
      {iso: "MWI", name: "Malawi", phonecode: "+265"},
      {iso: "MYS", name: "Malaysia", phonecode: "+60"},
      {iso: "MDV", name: "Maldives", phonecode: "+960"},
      {iso: "MLI", name: "Mali", phonecode: "+223"},
      {iso: "MLT", name: "Malta", phonecode: "+356"},
      {iso: "MHL", name: "Marshall Islands", phonecode: "+692"},
      {iso: "MTQ", name: "Martinique", phonecode: "+596"},
      {iso: "MRT", name: "Mauritania", phonecode: "+222"},
      {iso: "MUS", name: "Mauritius", phonecode: "+230"},
      {iso: "MYT", name: "Mayotte", phonecode: "+269"},
      {iso: "MEX", name: "Mexico", phonecode: "+52"},
      {iso: "FSM", name: "Micronesia", phonecode: "+691"},
      {iso: "MDA", name: "Moldova", phonecode: "+373"},
      {iso: "MCO", name: "Monaco", phonecode: "+377"},
      {iso: "MNG", name: "Mongolia", phonecode: "+976"},
      {iso: "MSR", name: "Montserrat", phonecode: "+1664"},
      {iso: "MAR", name: "Morocco", phonecode: "+212"},
      {iso: "MOZ", name: "Mozambique", phonecode: "+258"},
      {iso: "MMR", name: "Myanmar", phonecode: "+95"},
      {iso: "NAM", name: "Namibia", phonecode: "+264"},
      {iso: "NRU", name: "Nauru", phonecode: "+674"},
      {iso: "NPL", name: "Nepal", phonecode: "+977"},
      {iso: "NLD", name: "Netherlands", phonecode: "+31"},
      {iso: "ANT", name: "Netherlands Antilles", phonecode: "+599"},
      {iso: "NCL", name: "New Caledonia", phonecode: "+687"},
      {iso: "NZL", name: "New Zealand", phonecode: "+64"},
      {iso: "NIC", name: "Nicaragua", phonecode: "+505"},
      {iso: "NER", name: "Niger", phonecode: "+227"},
      {iso: "NGA", name: "Nigeria", phonecode: "+234"},
      {iso: "NIU", name: "Niue", phonecode: "+683"},
      {iso: "NFK", name: "Norfolk Islands", phonecode: "+672"},
      {iso: "MNP", name: "Northern Marianas", phonecode: "+670"},
      {iso: "NOR", name: "Norway", phonecode: "+47"},
      {iso: "OMN", name: "Oman", phonecode: "+968"},
      {iso: "PLW", name: "Palau", phonecode: "+680"},
      {iso: "PAN", name: "Panama", phonecode: "+507"},
      {iso: "PNG", name: "Papua New Guinea", phonecode: "+675"},
      {iso: "PRY", name: "Paraguay", phonecode: "+595"},
      {iso: "PER", name: "Peru", phonecode: "+51"},
      {iso: "PHL", name: "Philippines", phonecode: "+63"},
      {iso: "POL", name: "Poland", phonecode: "+48"},
      {iso: "PRT", name: "Portugal", phonecode: "+351"},
      {iso: "PRI", name: "Puerto Rico", phonecode: "+1787"},
      {iso: "QAT", name: "Qatar", phonecode: "+974"},
      {iso: "REU", name: "Reunion", phonecode: "+262"},
      {iso: "ROM", name: "Romania", phonecode: "+40"},
      {iso: "RUS", name: "Russia", phonecode: "+7"},
      {iso: "RWA", name: "Rwanda", phonecode: "+250"},
      {iso: "KNA", name: "St Kitts", phonecode: "+1869"},
      {iso: "LCA", name: "St Lucia", phonecode: "+1758"},
      {iso: "VCT", name: "Saint Vincent Grenadines", phonecode: "+1784"},
      {iso: "WSM", name: "Samoa", phonecode: "+685"},
      {iso: "SMR", name: "San Marino", phonecode: "+378"},
      {iso: "STP", name: "Sao Tome & Principe", phonecode: "+239"},
      {iso: "SAU", name: "Saudi Arabia", phonecode: "+966"},
      {iso: "SEN", name: "Senegal", phonecode: "+221"},
      {iso: "SRB", name: "Serbia", phonecode: "+381"},
      {iso: "SYC", name: "Seychelles", phonecode: "+248"},
      {iso: "SLE", name: "Sierra Leone", phonecode: "+232"},
      {iso: "SGP", name: "Singapore", phonecode: "+65"},
      {iso: "SVK", name: "Slovak Republic", phonecode: "+421"},
      {iso: "SVN", name: "Slovenia", phonecode: "+386"},
      {iso: "SLB", name: "Solomon Islands", phonecode: "+677"},
      {iso: "SOM", name: "Somalia", phonecode: "+252"},
      {iso: "ZAF", name: "South Africa", phonecode: "+27"},
      {iso: "ESP", name: "Spain", phonecode: "+34"},
      {iso: "LKA", name: "Sri Lanka", phonecode: "+94"},
      {iso: "SHN", name: "St. Helena", phonecode: "+290"},
      {iso: "KNA", name: "St. Kitts", phonecode: "+1869"},
      {iso: "LCA", name: "St. Lucia", phonecode: "+1758"},
      {iso: "SPM", name: "St. Pierre & Miquelon", phonecode: "+508"},
      {iso: "VCT", name: "St. Vincent", phonecode: "+1784"},
      {iso: "SDN", name: "Sudan", phonecode: "+249"},
      {iso: "SUR", name: "Suriname", phonecode: "+597"},
      {iso: "SWZ", name: "Swaziland", phonecode: "+268"},
      {iso: "SWE", name: "Sweden", phonecode: "+46"},
      {iso: "CHE", name: "Switzerland", phonecode: "+41"},
      {iso: "SYR", name: "Syria", phonecode: "+963"},
      {iso: "TWN", name: "Taiwan", phonecode: "+886"},
      {iso: "TJK", name: "Tajikstan", phonecode: "+7"},
      {iso: "THA", name: "Thailand", phonecode: "+66"},
      {iso: "TGO", name: "Togo", phonecode: "+228"},
      {iso: "TON", name: "Tonga", phonecode: "+676"},
      {iso: "TTO", name: "Trinidad & Tobago", phonecode: "+1868"},
      {iso: "TUN", name: "Tunisia", phonecode: "+216"},
      {iso: "TUR", name: "Turkey", phonecode: "+90"},
      {iso: "TKM", name: "Turkmenistan", phonecode: "+7"},
      {iso: "TCA", name: "Turks & Caicos Islands", phonecode: "+1649"},
      {iso: "TUV", name: "Tuvalu", phonecode: "+688"},
      {iso: "UGA", name: "Uganda", phonecode: "+256"},
      {iso: "GBR", name: "UK", phonecode: "+44"},
      {iso: "UKR", name: "Ukraine", phonecode: "+380"},
      {iso: "ARE", name: "United Arab Emirates", phonecode: "+971"},
      {iso: "URY", name: "Uruguay", phonecode: "+598"},
      {iso: "USA", name: "USA", phonecode: "+1"},
      {iso: "UZB", name: "Uzbekistan", phonecode: "+7"},
      {iso: "VUT", name: "Vanuatu", phonecode: "+678"},
      {iso: "VAT", name: "Vatican City", phonecode: "+379"},
      {iso: "VEN", name: "Venezuela", phonecode: "+58"},
      {iso: "VNM", name: "Vietnam", phonecode: "+84"},
      {iso: "VGB", name: "Virgin Islands - British", phonecode: "+1284"},
      {iso: "VIR", name: "Virgin Islands - US", phonecode: "+1340"},
      {iso: "WLF", name: "Wallis & Futuna", phonecode: "+681"},
      {iso: "ESH", name: "Western Sahara", phonecode: "+212"},
      {iso: "YEM", name: "Yemen", phonecode: "+967"},
      {iso: "ZMB", name: "Zambia", phonecode: "+260"},
      {iso: "ZWE", name: "Zimbabwe", phonecode: "+263"}];
return countries;
},
convertlocla_string(inumer,flag=false){
    if(inumer !=null){
        inumer = parseFloat(inumer,6);
        if(!flag){
 return inumer.toLocaleString("en-US",{
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});}else{
  return inumer.toLocaleString("en-US");
}}else{
  return inumer;
 }
},
getAllcountry_list_na(){
  var countries = [{iso: "SGP", name:"Singapore",phonecode:"+65"},
   {iso: "DZA", name: "Algeria", phonecode: "+213"},
      {iso: "AGO", name: "Angola", phonecode: "+244"},
      {iso: "AIA", name: "Anguilla", phonecode: "+1264"},
      {iso: "ATG", name: "Antigua", phonecode: "+1268"},
      {iso: "ATG", name: "Antigua Barbuda", phonecode: "+1268"},
      {iso: "ARG", name: "Argentina", phonecode: "+54"},
      {iso: "ARM", name: "Armenia", phonecode: "+374"},
      {iso: "BHR", name: "Bahrain", phonecode: "+374"},
      {iso: "BGD", name: "Bangladesh", phonecode: "+88"},
      {iso: "BRB", name: "Barbados", phonecode: "+1246"},
      {iso: "BLR", name: "Belarus", phonecode: "+375"},
      {iso: "BLZ", name: "Belize", phonecode: "+501"},
      {iso: "BEN", name: "Benin", phonecode: "+229"},
      {iso: "BMU", name: "Bermuda", phonecode: "+1441"},
      {iso: "BTN", name: "Bhutan", phonecode: "+975"},
      {iso: "BOL", name: "Bolivia", phonecode: "+591"},
      {iso: "BIH", name: "Bosnia Herzegovina", phonecode: "+387"},
      {iso: "BWA", name: "Botswana", phonecode: "+267"},
      {iso: "BRA", name: "Brazil", phonecode: "+55"},
      {iso: "BRN", name: "Brunei", phonecode: "+673"},
      {iso: "BGR", name: "Bulgaria", phonecode: "+359"},
      {iso: "BFA", name: "Burkina Faso", phonecode: "+226"},
      {iso: "BDI", name: "Burundi", phonecode: "+257"},
      {iso: "KHM", name: "Cambodia", phonecode: "+855"},
      {iso: "CMR", name: "Cameroon", phonecode: "+237"},
      {iso: "CAN", name: "Canada", phonecode: "+1"},
      {iso: "CPV", name: "Cape Verde Islands", phonecode: "+238"},
      {iso: "CYM", name: "Cayman Islands", phonecode: "+1345"},
      {iso: "CAF", name: "Central African Republic", phonecode: "+236"},
      {iso: "CHL", name: "Chile", phonecode: "+56"},
      {iso: "CHN", name: "China", phonecode: "+86"},
      {iso: "COL", name: "Colombia", phonecode: "+57"},
      {iso: "COM", name: "Comoros", phonecode: "+269"},
      {iso: "COG", name: "Congo", phonecode: "+242"},
      {iso: "COK", name: "Cook Islands", phonecode: "+682"},
      {iso: "CRI", name: "Costa Rica", phonecode: "+506"},
      {iso: "HRV", name: "Croatia", phonecode: "+385"},
      {iso: "CUB", name: "Cuba", phonecode: "+53"},
      {iso: "CYP", name: "Cyprus North", phonecode: "+90392"},
      {iso: "CYP", name: "Cyprus South", phonecode: "+357"},
      {iso: "CZE", name: "Czech Republic", phonecode: "+42"},
      {iso: "DNK", name: "Denmark", phonecode: "+45"},
      {iso: "DJI", name: "Djibouti", phonecode: "+253"},
      {iso: "DMA", name: "Dominica", phonecode: "+1809"},
      {iso: "DOM", name: "Dominican Republic", phonecode: "+1809"},
      {iso: "ECU", name: "Ecuador", phonecode: "+593"},
      {iso: "EGY", name: "Egypt", phonecode: "+20"},
      {iso: "SLV", name: "El Salvador", phonecode: "+503"},
      {iso: "GNQ", name: "Equatorial Guinea", phonecode: "+240"},
      {iso: "ERI", name: "Eritrea", phonecode: "+291"},
      {iso: "EST", name: "Estonia", phonecode: "+372"},
      {iso: "ETH", name: "Ethiopia", phonecode: "+251"},
      {iso: "FLK", name: "Falkland Islands", phonecode: "+500"},
      {iso: "FRO", name: "Faroe Islands", phonecode: "+298"},
      {iso: "FJI", name: "Fiji", phonecode: "+679"},
      {iso: "FIN", name: "Finland", phonecode: "+358"},
      {iso: "FRA", name: "France", phonecode: "+33"},
      {iso: "GUF", name: "French Guiana", phonecode: "+594"},
      {iso: "PYF", name: "French Polynesia", phonecode: "+689"},
      {iso: "GAB", name: "Gabon", phonecode: "+241"},
      {iso: "GMB", name: "Gambia", phonecode: "+220"},
      {iso: "GEO", name: "Georgia", phonecode: "+7880"},
      {iso: "DEU", name: "Germany", phonecode: "+49"},
      {iso: "GHA", name: "Ghana", phonecode: "+233"},
      {iso: "GIB", name: "Gibraltar", phonecode: "+350"},
      {iso: "GRC", name: "Greece", phonecode: "+30"},
      {iso: "GRL", name: "Greenland", phonecode: "+299"},
      {iso: "GRD", name: "Grenada", phonecode: "+1473"},
      {iso: "GLP", name: "Guadeloupe", phonecode: "+590"},
      {iso: "GUM", name: "Guam", phonecode: "+671"},
      {iso: "GTM", name: "Guatemala", phonecode: "+502"},
      {iso: "GIN", name: "Guinea", phonecode: "+224"},
      {iso: "GNB", name: "Guinea - Bissau", phonecode: "+245"},
      {iso: "GUY", name: "Guyana", phonecode: "+592"},
      {iso: "HTI", name: "Haiti", phonecode: "+509"},
      {iso: "HND", name: "Honduras", phonecode: "+504"},
      {iso: "HKG", name: "Hong Kong", phonecode: "+852"},
      {iso: "HUN", name: "Hungary", phonecode: "+36"},
      {iso: "ISL", name: "Iceland", phonecode: "+354"},
      {iso: "IND", name: "India", phonecode: "+91"},
      {iso: "IDN", name: "Indonesia", phonecode: "+62"},
      {iso: "IRN", name: "Iran", phonecode: "+98"},
      {iso: "IRQ", name: "Iraq", phonecode: "+964"},
      {iso: "IRL", name: "Ireland", phonecode: "+353"},
      {iso: "ISR", name: "Israel", phonecode: "+972"},
      {iso: "ITA", name: "Italy", phonecode: "+39"},
      {iso: "JAM", name: "Jamaica", phonecode: "+1876"},
      {iso: "JPN", name: "Japan", phonecode: "+81"},
      {iso: "JOR", name: "Jordan", phonecode: "+962"},
      {iso: "KAZ", name: "Kazakhstan", phonecode: "+7"},
      {iso: "KEN", name: "Kenya", phonecode: "+254"},
      {iso: "KIR", name: "Kiribati", phonecode: "+686"},
      {iso: "PRK", name: "Korea North", phonecode: "+850"},
      {iso: "KOR", name: "Korea South", phonecode: "+82"},
      {iso: "KWT", name: "Kuwait", phonecode: "+965"},
      {iso: "KGZ", name: "Kyrgyzstan", phonecode: "+996"},
      {iso: "LAO", name: "Laos", phonecode: "+856"},
      {iso: "LVA", name: "Latvia", phonecode: "+371"},
      {iso: "LBN", name: "Lebanon", phonecode: "+961"},
      {iso: "LSO", name: "Lesotho", phonecode: "+266"},
      {iso: "LBR", name: "Liberia", phonecode: "+231"},
      {iso: "LBY", name: "Libya", phonecode: "+218"},
      {iso: "LIE", name: "Liechtenstein", phonecode: "+417"},
      {iso: "LTU", name: "Lithuania", phonecode: "+370"},
      {iso: "LUX", name: "Luxembourg", phonecode: "+352"},
      {iso: "MAC", name: "Macao", phonecode: "+853"},
      {iso: "MKD", name: "Macedonia", phonecode: "+389"},
      {iso: "MDG", name: "Madagascar", phonecode: "+261"},
      {iso: "MWI", name: "Malawi", phonecode: "+265"},
      {iso: "MYS", name: "Malaysia", phonecode: "+60"},
      {iso: "MDV", name: "Maldives", phonecode: "+960"},
      {iso: "MLI", name: "Mali", phonecode: "+223"},
      {iso: "MLT", name: "Malta", phonecode: "+356"},
      {iso: "MHL", name: "Marshall Islands", phonecode: "+692"},
      {iso: "MTQ", name: "Martinique", phonecode: "+596"},
      {iso: "MRT", name: "Mauritania", phonecode: "+222"},
      {iso: "MUS", name: "Mauritius", phonecode: "+230"},
      {iso: "MYT", name: "Mayotte", phonecode: "+269"},
      {iso: "MEX", name: "Mexico", phonecode: "+52"},
      {iso: "FSM", name: "Micronesia", phonecode: "+691"},
      {iso: "MDA", name: "Moldova", phonecode: "+373"},
      {iso: "MCO", name: "Monaco", phonecode: "+377"},
      {iso: "MNG", name: "Mongolia", phonecode: "+976"},
      {iso: "MSR", name: "Montserrat", phonecode: "+1664"},
      {iso: "MAR", name: "Morocco", phonecode: "+212"},
      {iso: "MOZ", name: "Mozambique", phonecode: "+258"},
      {iso: "MMR", name: "Myanmar", phonecode: "+95"},
      {iso: "NAM", name: "Namibia", phonecode: "+264"},
      {iso: "NRU", name: "Nauru", phonecode: "+674"},
      {iso: "NPL", name: "Nepal", phonecode: "+977"},
      {iso: "NLD", name: "Netherlands", phonecode: "+31"},
      {iso: "ANT", name: "Netherlands Antilles", phonecode: "+599"},
      {iso: "NCL", name: "New Caledonia", phonecode: "+687"},
      {iso: "NZL", name: "New Zealand", phonecode: "+64"},
      {iso: "NIC", name: "Nicaragua", phonecode: "+505"},
      {iso: "NER", name: "Niger", phonecode: "+227"},
      {iso: "NGA", name: "Nigeria", phonecode: "+234"},
      {iso: "NIU", name: "Niue", phonecode: "+683"},
      {iso: "NFK", name: "Norfolk Islands", phonecode: "+672"},
      {iso: "MNP", name: "Northern Marianas", phonecode: "+670"},
      {iso: "NOR", name: "Norway", phonecode: "+47"},
      {iso: "OMN", name: "Oman", phonecode: "+968"},
      {iso: "PLW", name: "Palau", phonecode: "+680"},
      {iso: "PAN", name: "Panama", phonecode: "+507"},
      {iso: "PNG", name: "Papua New Guinea", phonecode: "+675"},
      {iso: "PRY", name: "Paraguay", phonecode: "+595"},
      {iso: "PER", name: "Peru", phonecode: "+51"},
      {iso: "PHL", name: "Philippines", phonecode: "+63"},
      {iso: "POL", name: "Poland", phonecode: "+48"},
      {iso: "PRT", name: "Portugal", phonecode: "+351"},
      {iso: "PRI", name: "Puerto Rico", phonecode: "+1787"},
      {iso: "QAT", name: "Qatar", phonecode: "+974"},
      {iso: "REU", name: "Reunion", phonecode: "+262"},
      {iso: "ROM", name: "Romania", phonecode: "+40"},
      {iso: "RUS", name: "Russia", phonecode: "+7"},
      {iso: "RWA", name: "Rwanda", phonecode: "+250"},
      {iso: "KNA", name: "St Kitts", phonecode: "+1869"},
      {iso: "LCA", name: "St Lucia", phonecode: "+1758"},
      {iso: "VCT", name: "Saint Vincent Grenadines", phonecode: "+1784"},
      {iso: "WSM", name: "Samoa", phonecode: "+685"},
      {iso: "SMR", name: "San Marino", phonecode: "+378"},
      {iso: "STP", name: "Sao Tome & Principe", phonecode: "+239"},
      {iso: "SAU", name: "Saudi Arabia", phonecode: "+966"},
      {iso: "SEN", name: "Senegal", phonecode: "+221"},
      {iso: "SRB", name: "Serbia", phonecode: "+381"},
      {iso: "SYC", name: "Seychelles", phonecode: "+248"},
      {iso: "SLE", name: "Sierra Leone", phonecode: "+232"},
      {iso: "SGP", name: "Singapore", phonecode: "+65"},
      {iso: "SVK", name: "Slovak Republic", phonecode: "+421"},
      {iso: "SVN", name: "Slovenia", phonecode: "+386"},
      {iso: "SLB", name: "Solomon Islands", phonecode: "+677"},
      {iso: "SOM", name: "Somalia", phonecode: "+252"},
      {iso: "ZAF", name: "South Africa", phonecode: "+27"},
      {iso: "ESP", name: "Spain", phonecode: "+34"},
      {iso: "LKA", name: "Sri Lanka", phonecode: "+94"},
      {iso: "SHN", name: "St. Helena", phonecode: "+290"},
      {iso: "KNA", name: "St. Kitts", phonecode: "+1869"},
      {iso: "LCA", name: "St. Lucia", phonecode: "+1758"},
      {iso: "SPM", name: "St. Pierre & Miquelon", phonecode: "+508"},
      {iso: "VCT", name: "St. Vincent", phonecode: "+1784"},
      {iso: "SDN", name: "Sudan", phonecode: "+249"},
      {iso: "SUR", name: "Suriname", phonecode: "+597"},
      {iso: "SWZ", name: "Swaziland", phonecode: "+268"},
      {iso: "SWE", name: "Sweden", phonecode: "+46"},
      {iso: "CHE", name: "Switzerland", phonecode: "+41"},
      {iso: "SYR", name: "Syria", phonecode: "+963"},
      {iso: "TWN", name: "Taiwan", phonecode: "+886"},
      {iso: "TJK", name: "Tajikstan", phonecode: "+7"},
      {iso: "THA", name: "Thailand", phonecode: "+66"},
      {iso: "TGO", name: "Togo", phonecode: "+228"},
      {iso: "TON", name: "Tonga", phonecode: "+676"},
      {iso: "TTO", name: "Trinidad & Tobago", phonecode: "+1868"},
      {iso: "TUN", name: "Tunisia", phonecode: "+216"},
      {iso: "TUR", name: "Turkey", phonecode: "+90"},
      {iso: "TKM", name: "Turkmenistan", phonecode: "+7"},
      {iso: "TCA", name: "Turks & Caicos Islands", phonecode: "+1649"},
      {iso: "TUV", name: "Tuvalu", phonecode: "+688"},
      {iso: "UGA", name: "Uganda", phonecode: "+256"},
      {iso: "GBR", name: "UK", phonecode: "+44"},
      {iso: "UKR", name: "Ukraine", phonecode: "+380"},
      {iso: "ARE", name: "United Arab Emirates", phonecode: "+971"},
      {iso: "URY", name: "Uruguay", phonecode: "+598"},
      {iso: "USA", name: "USA", phonecode: "+1"},
      {iso: "UZB", name: "Uzbekistan", phonecode: "+7"},
      {iso: "VUT", name: "Vanuatu", phonecode: "+678"},
      {iso: "VAT", name: "Vatican City", phonecode: "+379"},
      {iso: "VEN", name: "Venezuela", phonecode: "+58"},
      {iso: "VNM", name: "Vietnam", phonecode: "+84"},
      {iso: "VGB", name: "Virgin Islands - British", phonecode: "+1284"},
      {iso: "VIR", name: "Virgin Islands - US", phonecode: "+1340"},
      {iso: "WLF", name: "Wallis & Futuna", phonecode: "+681"},
      {iso: "ESH", name: "Western Sahara", phonecode: "+212"},
      {iso: "YEM", name: "Yemen", phonecode: "+967"},
      {iso: "ZMB", name: "Zambia", phonecode: "+260"},
      {iso: "ZWE", name: "Zimbabwe", phonecode: "+263"}
  ];
return countries;
},
change_date_format:function(date_value){

  var d = new Date(date_value);
  
  return d.toISOString().split('T')[0];
},
 formatBytes:function(bytes, decimals = 2) {
  console.log(bytes);
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
},
change_date_format_time:function(date_value){
  date_value = date_value.split('T')[0];
  var d = new Date(date_value);
  
  return d.toDateString();
},
get_cal_numebr_share:function(numberShare,price_amount,){
  var amount_data = (numberShare*price_amount);
  return amount_data;
},
get_total_amount_with_proceed:function(numberShare,price_amount,wholewithone,placement_free=.01){

var amount_data = (numberShare*price_amount*placement_free)*wholewithone;
amount_data = amount_data+(numberShare*price_amount)
return amount_data;
},
get_total_placement_free_proceed:function(numberShare,price_amount,placement_free=.01){
  console.log(price_amount);
  var amount_data = (numberShare*price_amount*placement_free);
  console.log(amount_data);
  return amount_data;
},
get_total_amount_place_amount:function(numberShare,price_amount,placement_free_data,wholewithone){
  var amount_data = ((numberShare*price_amount)*placement_free_data)*wholewithone;
  return amount_data;
  },
  tConvert:function(time) {
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
  },
  set_notification_number:function(number_value){
this.notification_number_value = number_value;
  },
  call_address_api:async function(postalcode,country_iso){
    var b_url = "https://geocode.search.hereapi.com/v1/geocode?qq=postalCode="+postalcode+"&in=countryCode:"+country_iso+"&apiKey=wNFVFjQER4nB_olUc8uCpbiucGcW4W-A2KbiRFnCPKM"
    return await axios.get(b_url);
  }


}






}