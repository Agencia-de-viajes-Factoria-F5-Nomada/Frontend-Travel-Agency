import { useState, useRef } from 'react'
import { ImagePlus, Trash2, RefreshCw } from 'lucide-react'
import Button from '../atoms/Button'
import Label from '../atoms/Label'
import LoadingSpinner from '../atoms/LoadingSpinner'
import Modal from './Modal'
import { cloudinaryService } from '../../services/cloudinaryService'
import { classNames } from '../../utils/classNames'

/**
 * Extrae el publicId de una URL de Cloudinary.
 * Ejemplo: "https://res.cloudinary.com/xxx/image/upload/v123/folder/abc.jpg"
 *       -> "folder/abc"
 */
const extractPublicId = (url) => {
  try {
    const parts = url.split('/upload/')
    if (parts.length < 2) return null
    // Quitar version (v123456/) si existe y la extension
    return parts[1]
      .replace(/^v\d+\//, '')
      .replace(/\.[^.]+$/, '')
  } catch {
    return null
  }
}

const ImageUpload = ({
  value = '',
  onChange,
  name = 'imageUrl',
  label = 'Imagen',
  hint,
  error,
  disabled = false,
  className,
}) => {
  const fileRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const emitChange = (url) => {
    onChange({ target: { name, value: url } })
  }

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setUploadError(null)

    try {
      const url = await cloudinaryService.upload(file)
      emitChange(url)
    } catch (err) {
      setUploadError(err.message || 'Error al subir la imagen')
    } finally {
      setUploading(false)
      // Reset para permitir seleccionar el mismo archivo otra vez
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const handleRemoveOnly = () => {
    emitChange('')
    setShowDeleteModal(false)
    setUploadError(null)
  }

  const handleRemoveAndDelete = async () => {
    setDeleting(true)
    try {
      const publicId = extractPublicId(value)
      if (publicId) {
        await cloudinaryService.delete(publicId)
      }
      emitChange('')
      setShowDeleteModal(false)
      setUploadError(null)
    } catch (err) {
      setUploadError(err.message || 'Error al eliminar de Cloudinary')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className={classNames('space-y-2', className)}>
      <Label>{label}</Label>

      {/* Input oculto */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        disabled={disabled || uploading}
        onChange={handleFileSelect}
      />

      {/* Estado: subiendo */}
      {uploading && (
        <div className="flex h-32 flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-surface-600 bg-surface-800/50">
          <LoadingSpinner size="md" />
          <span className="text-sm text-ink-muted">Subiendo imagen...</span>
        </div>
      )}

      {/* Estado: con imagen */}
      {!uploading && value && (
        <div className="space-y-2">
          <div className="relative overflow-hidden rounded-lg border border-surface-600">
            <img
              src={value}
              alt="preview"
              className="h-32 w-full object-cover"
            />
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              disabled={disabled}
              onClick={() => fileRef.current?.click()}
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Cambiar imagen
            </Button>
            <Button
              size="sm"
              variant="danger"
              disabled={disabled}
              onClick={() => setShowDeleteModal(true)}
            >
              <Trash2 className="h-3.5 w-3.5" />
              Eliminar
            </Button>
          </div>
        </div>
      )}

      {/* Estado: sin imagen */}
      {!uploading && !value && (
        <button
          type="button"
          disabled={disabled}
          onClick={() => fileRef.current?.click()}
          className="flex h-32 w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-surface-600 bg-surface-800/50 text-ink-muted transition-colors hover:border-brand-400 hover:bg-surface-800 hover:text-white disabled:pointer-events-none disabled:opacity-50"
        >
          <ImagePlus className="h-6 w-6" />
          <span className="text-sm font-medium">Seleccionar imagen</span>
        </button>
      )}

      {/* Hint */}
      {hint && !uploadError && !error && (
        <p className="text-xs text-ink-muted">{hint}</p>
      )}

      {/* Error */}
      {(uploadError || error) && (
        <p className="text-xs text-red-400">{uploadError || error}</p>
      )}

      {/* Modal de confirmacion de eliminacion */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Eliminar imagen"
        size="sm"
      >
        <p className="text-ink-soft">
          ¿Quieres eliminar tambien la imagen de Cloudinary o solo quitarla del formulario?
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="ghost" onClick={handleRemoveOnly}>
            Solo quitar del formulario
          </Button>
          <Button
            variant="danger"
            onClick={handleRemoveAndDelete}
            disabled={deleting}
          >
            {deleting ? (
              <>
                <LoadingSpinner size="sm" />
                Eliminando...
              </>
            ) : (
              'Eliminar de Cloudinary'
            )}
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default ImageUpload
