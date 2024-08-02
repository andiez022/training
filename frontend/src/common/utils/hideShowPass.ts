function hideShowPass({ password }: { password: string }): void {
  const x = document.getElementById(password) as HTMLInputElement | null;
  if (x) {
    if (x.type === 'password') {
      x.type = 'text';
    } else {
      x.type = 'password';
    }
  }
}

export default hideShowPass;
