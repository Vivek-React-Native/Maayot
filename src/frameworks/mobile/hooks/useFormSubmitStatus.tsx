import React, {useEffect, useMemo, useRef, useState} from 'react'

const useFormSubmitStatus = () => {
  const [submitText, setSubmitText] = useState<string>("");
  const [submitStatus, setSubmitStatus] = useState<'success' | 'fail' | ''>('')
  const timerId = useRef<number | null>(null);

  useEffect(() => {
    if(submitStatus) {
      timerId.current = setTimeout(() => {
        setSubmitStatus("")
      }, 3000);
    }
  },[submitStatus])

  const _clearTimeout = () => {
    if (timerId.current) {
      clearTimeout(timerId.current);
      timerId.current = null;
    }
  };

  useEffect(() => {
    return () => _clearTimeout()
  },[]);

  return {
    submitText,
    setSubmitText,
    submitStatus,
    setSubmitStatus
  }
}
export default useFormSubmitStatus;
