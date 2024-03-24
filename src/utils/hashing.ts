import bcrypt from 'bcrypt'

export const hashing = (password: string) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash
}

export const compare = (password: string, hash: string) => {
    return bcrypt.compareSync(password, hash)
}