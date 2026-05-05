import Badge from '../ui/Badge'

const STATUS_LABELS = {
  confirmed: 'Confirmada',
  pending: 'Pendiente',
  active: 'Activo',
  inactive: 'Inactivo',
}

const STATUS_TONES = {
  confirmed: 'confirmed',
  pending: 'pending',
  active: 'confirmed',
  inactive: 'pending',
}

const StatusPill = ({ status }) => (
  <Badge tone={STATUS_TONES[status] || 'neutral'}>
    {STATUS_LABELS[status] || status}
  </Badge>
)

export default StatusPill
