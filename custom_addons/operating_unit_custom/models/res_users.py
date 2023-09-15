from odoo import fields, models,api


class ResUsers(models.Model):
    _inherit = "res.users"

    def get_default_current_operating_units(self):
        return self.default_operating_unit_id.ids

    current_operating_unit_ids = fields.One2many('operating.unit', 'current_user_id',
                                                 string='Current Operating Units',
                                                 default=get_default_current_operating_units)

    def update_values(self, values):

        val = values.get('current_operating_unit_ids')
        current_user = self.env['res.users'].search([('id', '=', self._uid)])
        current_user.sudo().write({
            'current_operating_unit_ids': [(6, 0, val)],
        })
        if not self.operating_unit_ids:
            self.write({
                'operating_unit_ids': [(6, 0, val)],
            })

    def write(self, vals):
        return super(ResUsers, self).write(vals)
