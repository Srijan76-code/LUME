import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSnapshot } from 'valtio'
import state from '../store'

import {
    headContainerAnimation,
    headContentAnimation,
    headTextAnimation,
    slideAnimation
} from "../config/motion"
import { CustomButton } from '../components'


const Home = () => {
    const snap = useSnapshot(state)

    return (
        <AnimatePresence>
            {
                snap.intro && (
                    <motion.section className='home' {...slideAnimation("left")} >

                        <motion.header {...slideAnimation("down")}>
                            <img className='w-8 h-8 object-contain ' src="/threejs.png" alt="three js logo" />
                        </motion.header>

                        <motion.div className='home-content'{...headContainerAnimation}>
                            <motion.div {...headTextAnimation} >
                                <h1 className='head-text' >Unleash <br className='xl:block hidden' />Your Style</h1>
                            </motion.div>



                            <motion.div className='flex flex-col gap-5 ' {...headContentAnimation} >
                                <p className=' max-w-md font-normal text-gray-600 text-base' >Bring your ideas to life with our cutting-edge 3D design tool. Create a T-shirt that’s as <strong>bold and unique as you.</strong>
                                </p>
                                <CustomButton

                                    type="filled"
                                    title="Customize it"
                                    handleClick={() => state.intro = false}
                                    customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                                />
                            </motion.div>
                        </motion.div>

                    </motion.section>
                )
            }
        </AnimatePresence>

    )
}

export default Home
