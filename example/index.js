

watchdog.client({})

// console.log(a);

const p = new Promise((resolve, reject) => {
    console.log(a);
    reject()
})

p.then(() => {})