package com.shefat.plugin; // This must match with the plugin.xml and package.json

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
           // Example is the 3rd parameter in javascript part
public class Example extends CordovaPlugin  {

    @Override                   // action is the 4th parameter, args is the array from 5th parameter in javascript part
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {

        if (action.equals("Example")) {

          try {
            String responseText = "Hello world, " + args.getString(0);
            callbackContext.success(responseText);
          } catch (JSONException e) {
            callbackContext.error("Failed to parse parameters");
          }
          return true;
        }

        return false; // Returning false results in a "MethodNotFound" error.
    }
}
