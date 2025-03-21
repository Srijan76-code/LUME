import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSnapshot } from 'valtio'
import state from '../store'
import {
  fadeAnimation,
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation
} from "../config/motion"
import config from "../config/config"
import { download, logoShirt, stylishShirt } from "../assets"
import { downloadCanvasToImage, reader } from "../config/helpers"
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants"
import { AiPicker, ColorPicker, FilePicker, Tab, CustomButton } from "../components"

const Customizer = () => {
  const snap = useSnapshot(state)
  const [file, setFile] = useState("")
  const [prompt, setPrompt] = useState("")
  const [generatingImg, setGeneratingImg] = useState(false)
  const [activeEditorTab, setActiveEditorTab] = useState("")
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false
  })

  //show tab content depending upon tab:-
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />
        break;
      case "filepicker":
        return (
          <FilePicker
            file={file}
            setFile={setFile}
            readFile={readFile}
          />)
        break;
      case "aipicker":
        return <AiPicker />
        break;

      default:
        return null
        break;
    }
  }

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type]
    state[decalType.stateProperty] = result
    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab)
    }
  }
  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogotexture = !activeFilterTab[tabName]
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName]
        break;

      default:
        state.isFullTexture = false
        state.isLogotexture = true
        break;
    }
    setActiveFilterTab((prevState) => {
      return {
        ...prevState, [tabName]: !prevState[tabName]
      }
    })
  }


  //reading the file:-
  const readFile = (type) => {
    reader(file)
      .then((result) => {
        handleDecals(type, result)
        setActiveEditorTab("")
      })
  }


  return (
    <AnimatePresence>
      {
        !snap.intro && (
          <>
            <motion.div key="custom" className='absolute top-0 left-0 z-10 ' {...slideAnimation("left")} >
              <div className="flex items-center min-h-screen ">
                <div className="editortabs-container tabs">
                  {EditorTabs.map((tab) => (
                    <Tab key={tab.name} tab={tab} handleClick={() => setActiveEditorTab(tab.name)} />
                  ))}
                  {generateTabContent()}
                </div>
              </div>
            </motion.div >


            <motion.div className='absolute z-10 top-5 right-5 ' {...fadeAnimation} >
              <CustomButton
                type="filled"
                title="Go Back"
                handleClick={() => state.intro = true}
                customStyles="w-fit px-4 py-2.5 font-bold text-sm"
              />
            </motion.div>

            <motion.div className='filtertabs-container' {...slideAnimation("up")} >
              {FilterTabs.map((tab) => (
                <Tab key={tab.name} tab={tab} isFilterTab isActiveTab={activeFilterTab[tab.name]} handleClick={() => handleActiveFilterTab(tab.name)} />
              ))}
            </motion.div>



          </>
        )
      }
    </AnimatePresence>
  )
}

export default Customizer
