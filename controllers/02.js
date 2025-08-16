export const userControllersID = (req, res) => {
    const id = req.params.id;
    console.log(id);
    res.status(200).json({
        success: true,
        id,
        message: "User ID is " + id,
    })
}

export const userControllersBody = (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            success: false,
            message: "Name and Email are required"
        })
    }

    res.status(200).json({
        success: true,
        name,
        email,
        message: "Suceesfully Request"
    })
}

export const userControllersSearch = (req, res) => {
    const { name, age } = req.query;

    res.status(200).json({
        success: true,
        name,
        age,
        message: "Suceesfully Request"
    })
}