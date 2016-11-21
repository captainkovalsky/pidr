'use strict';

describe('myApp.page1 module', function() {

  beforeEach(module('myApp.page1'));

  describe('view1 controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var view1Ctrl = $controller('ThesaurusController');
      expect(view1Ctrl).toBeDefined();
    }));

  });
});