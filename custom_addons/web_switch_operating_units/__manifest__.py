{
    "name": "Easy Operating Unit Switching",
    "summary": """
        User With Multiple Operating Unit (OU) Can Easily Switch From Menu""",
    "version": "15.0.0.0",
    "author": "",
    "category": "Generic",
    "depends": ["web", "operating_unit_custom"],
    "data": [
        # 'views/web_switch_operating_units.xml',
    ],

    # "qweb": [
    #     # "static/src/xml/switch_op.xml",
    # ],

    # "assets": {
    #     "web.assets_backend": [
    #         "web_switch_operating_units/static/src/js/switch_op.js",
    #     ],
    #     "web.assets_frontend": [
    #         "web_switch_operating_units/static/src/scss/navbar_mobile.scss",
    #     ],
    #     "web.assets_qweb":[
    #         "/home/aby/odoo-15.0/op_unit/web_switch_operating_units/static/src/xml/switch_op.xml"
    #     ]
    # },

    'assets': {
        'web.assets_backend': [
            'web_switch_operating_units/static/src/js/switch_op.js',
            'web_switch_operating_units/static/src/scss/navbar_mobile.scss'
        ],
        'web.assets_qweb': [
            'web_switch_operating_units/static/src/xml/switch_op.xml'
        ],
    },

    'license': 'LGPL-3',
    'images': [],
    'installable': True,
    'auto_install': False,
    'application': True,
}
