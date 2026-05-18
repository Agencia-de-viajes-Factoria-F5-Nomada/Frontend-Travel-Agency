const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      if (isSignIn) {
        await authService.login(form.email, form.password)
      } else {
        if (form.password.length < 8) {
          setError('La contraseña debe tener al menos 8 caracteres')
          setLoading(false)
          return
        }
        if (!/[A-Z]/.test(form.password) || !/[0-9]/.test(form.password)) {
          setError('La contraseña debe contener al menos una mayúscula y un número')
          setLoading(false)
          return
        }
        const res = await fetch(`${import.meta.env.VITE_API_URL ?? 'http://localhost:8080'}/api/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name:     form.name,
            email:    form.email,
            password: form.password,
          }),
        })
        if (!res.ok) throw new Error('Error al crear la cuenta')
        await authService.login(form.email, form.password)
      }

      const user = authService.getUser()
      navigate(user?.role === 'ADMIN' || user?.rol === 'ADMIN' ? '/admin' : '/profile')
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }