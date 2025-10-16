export default {
    data() {
      return {
        result:{
            errors: [],
            status: true},
            validation: []
        
      }
    },
    methods: {
      validation_input(event){
        //onkeyup validation
        const email = event.target.value;
        console.log(email);
      },
      emailvalidation: function (event) {
        const value = event.target.value
         this.keywords = value
            alert(value);
     },
     validEmail: function (email) {
      
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      },
      validName: function(name){
        var re = /^[a-zA-Z ]{2,30}$/;
        return re.test(name);
      },
      validnumbre: function(number){
        var re = /^\d*$/;
        return re.test(number);
      },
      validMathNumber: function(number){
        var re = /^\s*[+-]?(\d+|\d*\.\d+|\d+\.\d*)([Ee][+-]?\d+)?\s*$/;
        return re.test(number);
      },
      errormessageadd: function(key,msg=null){
             
        var key_element = document.querySelector("#parent-"+key);
        key_element.classList.add('is-invalid');
        if(msg != null){
        var erro_element = document.querySelector("#error-"+key);
       
        if(erro_element != null){
        erro_element.classList.add('invalid-feedback');
        erro_element.classList.remove('d-none');
        erro_element.textContent = msg;}
      }
        
      },
      errormessageremoved: function (key){
        var key_element = document.querySelector("#parent-"+key);
        if(key_element){
        key_element.classList.remove('is-invalid');
        var erro_element = document.querySelector("#error-"+key);
      
        if(erro_element != null){
        erro_element.classList.remove('invalid-feedback');
        erro_element.classList.add('d-none');
      }
        }
        /*var erro_element = document.querySelector("#error-"+key);
        erro_element.classList.remove('invalid-feedback');
        erro_element.classList.add('d-none');
        erro_element.textContent = '';*/
      },
      requiredFunction: function(name){
        if (!name) {
          return false;
        }
        else{
          return true;
        }
      },
      requirednotFunction: function(name){
        console.log(name)
         return true;
      },
      checkvalidationarray(validtionarrays) {
        let indexes = [];
        for (let i = 0; i < validtionarrays.length; i++) {
          if (!validtionarrays[i]) indexes.push(i);
        }
        if (typeof indexes !== 'undefined' && indexes.length === 0) {
          return true;
        }
        else {
          return false;
        }
      },
      validationallform: function(inputelement){
        var allinput = Object.keys(inputelement);
        for (let i = 0; i < allinput.length; i++) {
          if(inputelement[allinput[i]].key){
          for(let k = 0; k < inputelement[allinput[i]].key.length; k++){
            var checkvalidor = false;
            if(inputelement[allinput[i]].pattern == "undefined" || inputelement[allinput[i]].pattern == null){
            checkvalidor = this[inputelement[allinput[i]].key[k]](inputelement[allinput[i]].name);
          }
          else{
           
            if(inputelement[allinput[i]].key[k] == "checkConfirmpassword"){
             
             checkvalidor = this[inputelement[allinput[i]].key[k]](inputelement[allinput[i]].name,inputelement[inputelement[allinput[i]].pattern].name);
            
          }
          else{
            if(k == inputelement[allinput[i]].key_ser && inputelement[allinput[i]].key_ser !== "undefined" ){
              checkvalidor = this[inputelement[allinput[i]].key[k]](inputelement[allinput[i]].name,inputelement[allinput[i]].pattern);
            }
            else{
              checkvalidor = this[inputelement[allinput[i]].key[k]](inputelement[allinput[i]].name);
            }
          
          }
          }
            if(!checkvalidor){
              this.errormessageadd(inputelement[allinput[i]].keyname,inputelement[allinput[i]].msg[k]);
              this.errors.push(inputelement[allinput[i]].msg[k]);
              break;
            }
            else{
              this.errormessageremoved(inputelement[allinput[i]].keyname);
            }
          }
          this.validation.push(checkvalidor);
        }
          
        }
      },
      passwordonkeyvalidation: function(pattern_array,e){
        var  text = e.currentTarget.value;
        for (const key in pattern_array) {
          var validation_value = false;
      if(pattern_array[key]['id'] == 1){
        validation_value = this.checkinputlength(text,8); 
        if(validation_value){
          this.changevalidtionkey('msg_',pattern_array[key]['id']);
        }
        else{
          this.changevalidtionkeyremove('msg_',pattern_array[key]['id'])
        }
      }
      if(pattern_array[key]['id'] == 2){
       validation_value = this.checkcapexit(text); 
       var other_validation_value = this.checksmallexit(text); 
       if(validation_value && other_validation_value){
        this.changevalidtionkey('msg_',pattern_array[key]['id']);
      }
      else{
        this.changevalidtionkeyremove('msg_',pattern_array[key]['id'])
      }
      }

      if(pattern_array[key]['id'] == 3){
        validation_value = this.checknumberexit(text);
        if(validation_value){
          this.changevalidtionkey('msg_',pattern_array[key]['id']);
        }
        else{
          this.changevalidtionkeyremove('msg_',pattern_array[key]['id'])
        }
      }

      if(pattern_array[key]['id'] == 4){
        validation_value = this.checkspsyamble(text);
        if(validation_value){
          this.changevalidtionkey('msg_',pattern_array[key]['id']);
        }
        else{
          this.changevalidtionkeyremove('msg_',pattern_array[key]['id'])
        }
      }
        
        }
      },
      custompattern: function(text){
        var re = /^\s*[+-]?(\d+|\d*\.\d+|\d+\.\d*)([Ee][+-]?\d+)?\s*$/;
        
        return re.test(text);
      },
      checkinputlength: function(text,length){
        var len = text.length;
        len <= length
        if(len <= length){
          return false;
        }
        else{
          return true;
        }
      },
      checkcapexit: function(text){
        var re = /[A-Z]/;
        return re.test(text);
      },
      checksmallexit: function(text){
        var re = /[a-z]/;
        return re.test(text);
      }, 
      checknumberexit: function(text){
        var re = /[0-9]/;
        return re.test(text);
      }, 
      checkspsyamble: function(text){
        var re = /[@#$*!%^&+.=]/;
        return re.test(text);
      },
      changevalidtionkey:function(prfix,id){
        //add class
        
        var element = document.getElementById(prfix+id);
        if(element){
         element.setAttribute('class', 'fas fa-check-circle');
        }
      },
      changevalidtionkeyremove:function(prfix,id){
        //add class
        
        var element = document.getElementById(prfix+id);
        if(element){
        element.setAttribute('class', 'fas fa-times-circle');
        }
       
      },
      checkConfirmpassword: function(confirmpassword,password){
       
        if(confirmpassword == password){
          return true;
        }
        else{
          return false;
        }
      },
      passwordvalidation: function(text,pattern_array){
       var subvalid = [];
       
       var index = null;
        for (const key in pattern_array) {
          var validation_value = false;
      if(pattern_array[key]['id'] == 1){
        validation_value = this.checkinputlength(text,8); 
        if(validation_value){
          this.changevalidtionkey('msg_',pattern_array[key]['id']);
          if(subvalid.length){
            index = subvalid.indexOf(pattern_array[key]['id']);
            subvalid.push(pattern_array[key]['id']);
            if (index !== -1) {
            subvalid.splice(index, 1);
            }
          }
        }
        else{
          this.changevalidtionkeyremove('msg_',pattern_array[key]['id']);
          subvalid.push(pattern_array[key]['id']);
        }
      }
      if(pattern_array[key]['id'] == 2){
       validation_value = this.checkcapexit(text); 
       var other_validation_value = this.checksmallexit(text); 
       if(validation_value && other_validation_value){
        this.changevalidtionkey('msg_',pattern_array[key]['id']);
        if(subvalid.length){
          index = subvalid.indexOf(pattern_array[key]['id']);
          if (index !== -1) {
          subvalid.splice(index, 1);
          }
        }
      }
      else{
       
        this.changevalidtionkeyremove('msg_',pattern_array[key]['id']);
        subvalid.push(pattern_array[key]['id']);
      
      }
      }

      if(pattern_array[key]['id'] == 3){
        validation_value = this.checknumberexit(text);
        if(validation_value){
          this.changevalidtionkey('msg_',pattern_array[key]['id']);
          if(subvalid.length){
            index = subvalid.indexOf(pattern_array[key]['id']);
            if (index !== -1) {
            subvalid.splice(index, 1);
            }
          }
        }
        else{
          this.changevalidtionkeyremove('msg_',pattern_array[key]['id']);
          subvalid.push(pattern_array[key]['id']);
        }
      }

      if(pattern_array[key]['id'] == 4){
        validation_value = this.checkspsyamble(text);
        if(validation_value){
          this.changevalidtionkey('msg_',pattern_array[key]['id']);
          if(subvalid.length){
            index = subvalid.indexOf(pattern_array[key]['id']);
            if (index !== -1) {
            subvalid.splice(index, 1);
            }
          }
        }
        else{
          this.changevalidtionkeyremove('msg_',pattern_array[key]['id']);
          subvalid.push(pattern_array[key]['id']);
        }
      }
        
        }
        if(subvalid.length === 0){
          return true;
        }else{
          return false;
        }
      }
    },

  }