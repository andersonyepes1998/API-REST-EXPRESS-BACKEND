export const register = (req, res) => {
    console.log(req.body);
    res.json({ ok:'Register' })
}

export const login = (req, res) => {
    res.json({ ok:'Login' })
}