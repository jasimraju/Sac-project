<template>

<div class="mb-3">
    
                        <input :type="type" class="form-control" :name="name" :placeholder="placeholder">
                      </div>
    </template>
    
    
    <script>
        export default {
        name: 'InputElement',
        props: {
          type: String,
          name: String,
          placeholder: String,

        }
        
    
        }
        </script>