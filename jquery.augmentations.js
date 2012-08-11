//------------------------------------------------------------------------------
// jQuery Augmentations
//  * A collection of small utilities like function shortcuts,
//    small functionalities, etc..
//
// Ivo Jesus, 2012
//------------------------------------------------------------------------------

(function($){
  //---------------------------------------------------------------------------
  // Define shortcut functions for..
  // these are usefull to use with "map" and "each"
  // EX: $("#myform :input").map($.val); // -> ["hi", "world", ...]
  $.each(["remove", "height", "width", "val", "html"], function(){
    eval("$."+this+" = function(){return $(this).first()."+this+"();};");
  });

  //---------------------------------------------------------------------------
  // Convert to bool - Only true or "true" return true, else returns false.
  $.bool = function(string){ return (/^true$/i).test(string); };

  //---------------------------------------------------------------------------
  // Checks the existence of an element.
  $.fn.exists = function(){ return this.length > 0; };
  $.exists    = function(selector){ return $(selector).exists(); };

  //---------------------------------------------------------------------------
  // This function gets the "id" attribute from a dom node.
  // If the attribute is undefined or empty, then a new one is generated.
  $.fn.id = function(){
    var $this = this.last();
    if ($this.attr("id") === undefined || $this.attr("id") === "")
      $this.attr("id", "node_" + $.now());
    return $this.attr("id");
  };
  $.id = function(){return $(this).id();};

  //---------------------------------------------------------------------------
  // Item enable/disable functionality
  // Marks items as enabled/disabled with a data attribute "enabled" and also
  // by removing/adding the "disabled" html attribute (usefull for inputs!)
  $.fn.enabled = function(){
    if ($(this).data("enabled") === undefined) $(this).enable();
    return $(this).data("enabled");
  };

  $.fn.disable = function(){ return $(this).data("enabled", false).attr("disabled", "disabled"); };
  $.fn.enable  = function(){ return $(this).data("enabled", true ).removeAttr("disabled");       };
  $.disable    = function(){ return $(this).disable(); };
  $.enable     = function(){ return $(this).enable();  };

  //---------------------------------------------------------------------------
  // Checks or/and marks an item as "initialized"
  // If "yes" is passed, then it sets the "initialized" data attribute to the
  // value of "yes", else sets it to false.
  // The return is always the state BEFORE the setting of the data attribute.
  // Ex:
  //  $("div").initialized();     // -> undefined
  //  $("div").initialized();     // -> false
  //  $("div").initialized(true); // -> false
  //  $("div").initialized();     // -> true
  //
  $.fn.initialized = function(yes){
    var ret_val = $(this).data("initialized");
    $(this).data("initialized", yes || false);
    return ret_val;
  };

  //---------------------------------------------------------------------------
})(jQuery);
