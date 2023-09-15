 odoo.define("web_switch_operating_units.SwitchOPs", function (require) {
 "use strict";
 var config = require("web.config");
 var core = require("web.core");
 var session = require("web.session");
 var SystrayMenu = require("web.SystrayMenu");
 var Widget = require("web.Widget");

 var _t = core._t;

 var SwitchOPs = Widget.extend({
     template: "SwitchOPs",
     events: {
         "click .dropdown-item[data-menu]": "_onClick",
         'click .dropdown-item[data-menu] div.log_into': '_onSwitchOpClick',
         'keydown .dropdown-item[data-menu] div.log_into': '_onSwitchOpClick',
         'click .dropdown-item[data-menu] div.toggle_op': '_onToggleOpClick',
         'keydown .dropdown-item[data-menu] div.toggle_op': '_onToggleOpClick',
         },

         /**
      * @override
      */
      init: function () {
             this._super.apply(this, arguments);
             this.isMobile = config.device.isMobile;
             this._onSwitchOpClick = _.debounce(this._onSwitchOpClick, 1500, true);
      },

         /**
      * @override
      */
      willStart: function () {
         var self = this;
         this.allowed_ops_ids = String(session.user_ops.current_op_ids)
                                     .split(',')
                                     .map(function (id) {return parseInt(id);});
         console.log(session.user_ops,"lllllllllllllllllllllll")
         this.user_ops = session.user_ops.allowed_ops;
         this.current_op = this.allowed_ops_ids[0];
         if(session.user_ops.allowed_ops.length > 0){
             this._rpc({
                 model: "res.users",
                 method: "update_values",
                 args: [[session.uid], {"current_operating_unit_ids": this.allowed_ops_ids}],
             })
             this.current_op_name = _.find(session.user_ops.allowed_ops, function (op) {
                 return op[0] === self.current_op;
             })[1];
         }
         return this._super.apply(this, arguments);
      },

     /**
      * @private
      * @param {MouseEvent|KeyEvent} ev
      */
      _updateValues: function (opID, op_ids) {
         this._rpc({
                 model: "res.users",
                 method: "update_values",
                 args: [[session.uid], {"current_operating_unit_ids": op_ids}],
 //            });
 //            this._rpc({
 //                model: "res.users",
 //                method: "write",
 //                args: [[session.uid], {"default_operating_unit_id": opID}],
             })
                 .then(function () {
                     location.reload();
                 });
      },


      _onSwitchOpClick: function (ev) {
         if (ev.type == 'keydown' && ev.which != $.ui.keyCode.ENTER && ev.which != $.ui.keyCode.SPACE) {
                 return;
         }
         ev.preventDefault();
         ev.stopPropagation();
         var dropdownItem = $(ev.currentTarget).parent();
         var dropdownMenu = dropdownItem.parent();
         var opID = dropdownItem.data('op-id');
         var allowed_op_ids = this.allowed_ops_ids;
         console.log('...allowed_op_ids',allowed_op_ids)
         if (dropdownItem.find('.fa-square-o').length) {
             // 1 enabled company: Stay in single company mode
             if (this.allowed_ops_ids.length === 1) {
                 if (this.isMobile) {
                     dropdownMenu = dropdownMenu.parent();
                 }
                 dropdownMenu.find('.fa-check-square').removeClass('fa-check-square').addClass('fa-square-o');
                 dropdownItem.find('.fa-square-o').removeClass('fa-square-o').addClass('fa-check-square');
                 allowed_op_ids = [opID];
             } else { // Multi company mode
                 allowed_op_ids.push(opID);
                 dropdownItem.find('.fa-square-o').removeClass('fa-square-o').addClass('fa-check-square');
             }
         }
         $(ev.currentTarget).attr('aria-pressed', 'true');
         this._updateValues(opID, allowed_op_ids);
     },


     _onToggleOpClick: function (ev) {
         if (ev.type == 'keydown' && ev.which != $.ui.keyCode.ENTER && ev.which != $.ui.keyCode.SPACE) {
             return;
         }
         ev.preventDefault();
         ev.stopPropagation();
         var dropdownItem = $(ev.currentTarget).parent();
         var opID = dropdownItem.data('op-id');
         var allowed_op_ids = this.allowed_ops_ids;
         var current_op_id = allowed_op_ids[0];
         if (dropdownItem.find('.fa-square-o').length) {
             allowed_op_ids.push(opID);
             dropdownItem.find('.fa-square-o').removeClass('fa-square-o').addClass('fa-check-square');
             $(ev.currentTarget).attr('aria-checked', 'true');
         } else {
             allowed_op_ids.splice(allowed_op_ids.indexOf(opID), 1);
             dropdownItem.find('.fa-check-square').addClass('fa-square-o').removeClass('fa-check-square');
             $(ev.currentTarget).attr('aria-checked', 'false');
         }
         this._updateValues(opID,allowed_op_ids);
     },

 });

 SystrayMenu.Items.push(SwitchOPs);
 return SwitchOPs;

 });

