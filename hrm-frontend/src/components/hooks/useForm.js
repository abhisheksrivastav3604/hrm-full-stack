import { useState, useCallback } from 'react';

/**
 * @template T
 * @typedef {Object} UseFormOptions
 * @property {T} initialValues
 * @property {(values: T) => Partial<Record<keyof T, string>>} [validate]
 * @property {(values: T) => Promise<void> | void} onSubmit
 */

/**
 * @template T
 * @param {UseFormOptions<T>} options
 * @returns {Object}
 */
export function useForm({
  initialValues,
  validate,
  onSubmit,
}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setValues((prev) => ({ ...prev, [name]: value }));
      // Clear error on change
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors],
  );

  const handleBlur = useCallback(
    (e) => {
      const { name } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
      if (validate) {
        const errs = validate(values);
        setErrors((prev) => ({ ...prev, [name]: errs[name] }));
      }
    },
    [validate, values],
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (validate) {
        const errs = validate(values);
        if (Object.keys(errs).length > 0) {
          setErrors(errs);
          // Mark all fields as touched
          const allTouched = Object.keys(values).reduce(
            (acc, k) => ({ ...acc, [k]: true }),
            {},
          );
          setTouched(allTouched);
          return;
        }
      }
      await onSubmit(values);
    },
    [validate, values, onSubmit],
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const setField = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  return { values, errors, touched, handleChange, handleBlur, handleSubmit, reset, setField };
}
