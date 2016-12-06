/**
 * trigger TYPES
 */
pimcore.registerNS("pimcore.plugin.cmf.rule.actions");

pimcore.registerNS("pimcore.plugin.cmf.rule.actions.AbstractAction");
pimcore.plugin.cmf.rule.actions.AbstractAction = Class.create({
    name: '',
    data: {},
    options: {},
    implementationClass: '',

    initialize: function (data) {

        this.data = data;
        this.options = typeof data.options == 'object' ? data.options : {}
    },

    getIcon: function(){
        return 'plugin_cmf_icon_actiontriggerrule_' + this.name
    },

    getId: function() {
        return 'plugin_cmf_actiontriggerrule_action' + this.name
    },

    getNiceName: function() {
        return t(this.getId());
    },

    getImplementationClass: function() {
        return this.implementationClass;
    },


    getFormItems: function() {
        return [];
    },

    getTopBar: function (index, parent) {
        return [
            {
                iconCls: this.getIcon(),
                disabled: true
            },
            {
                xtype: "tbtext",
                text: "<b>" + this.getNiceName() + "</b>"
            },
            "->",
            {
                iconCls: "pimcore_icon_delete",
                handler: function (index, parent) {
                    parent.actionsContainer.remove(Ext.getCmp(index));
                }.bind(window, index, parent)
            }];
    }
});

pimcore.registerNS("pimcore.plugin.cmf.rule.actions.AddSegment");
pimcore.plugin.cmf.rule.actions.AddSegment = Class.create(pimcore.plugin.cmf.rule.actions.AbstractAction,{
    name: 'AddSegment',
    implementationClass: '\\CustomerManagementFramework\\ActionTrigger\\Action\\AddSegment',
    getFormItems: function() {

        return [{
            name: "segment",
            fieldLabel: t('segment'),
            xtype: "textfield",
            width: 500,
            cls: "input_drop_target",
            value: this.options.segment,
            listeners: {
                "render": function (el) {
                    new Ext.dd.DropZone(el.getEl(), {
                        reference: this,
                        ddGroup: "element",
                        getTargetFromEvent: function (e) {
                            return this.getEl();
                        }.bind(el),

                        onNodeOver: function (target, dd, e, data) {


                            data = data.records[0].data;

                            if(data.type != 'object') {
                                return Ext.dd.DropZone.prototype.dropNotAllowed;
                            }


                            if(data.className != 'CustomerSegment') {
                                return Ext.dd.DropZone.prototype.dropNotAllowed;
                            }

                            return Ext.dd.DropZone.prototype.dropAllowed;
                        },

                        onNodeDrop: function (target, dd, e, data) {


                            data = data.records[0].data;

                            if(data.type != 'object') {
                                return false;
                            }

                            if(data.className != 'CustomerSegment') {
                                return false;
                            }

                            this.setValue(data.path);
                            return true;
                        }.bind(el)
                    });
                }
            }
        }];
    }
});