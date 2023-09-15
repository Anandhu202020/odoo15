from odoo import models, api, fields
from odoo.http import request


class Http(models.AbstractModel):
    _inherit = 'ir.http'
    print('call')

    def session_info(self):
        res = super(Http, self).session_info()
        user = request.env.user
        display_switch_op_menu = len(user.operating_unit_ids) > 1
        allowed_ops = [(comp.id, comp.name) for comp in
                       user.operating_unit_ids]

        res.update({
            "user_ops":
                {
                    "current_op": (user.default_operating_unit_id.id,
                                   user.default_operating_unit_id.name),
                    "allowed_ops": allowed_ops if allowed_ops else [(user.default_operating_unit_id.id,
                                                                     user.default_operating_unit_id.name)],
                    "current_op_ids": user.current_operating_unit_ids.ids if user.current_operating_unit_ids else user.default_operating_unit_id.ids
                }
        })
        # res = super(Http, self).session_info()
        return res
