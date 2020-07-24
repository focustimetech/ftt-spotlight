import React from 'react'
import { FixedSizeList, ListChildComponentProps, ReactElementType } from 'react-window'

import {
    ClickAwayListener,
    createStyles,
    FormControl,
    Icon,
    IconButton,
    Input,
    InputAdornment,
    makeStyles,
    Menu,
    MenuItem,
    MenuList,
    Paper,
    Popper,
    Theme
} from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'

import { IStudent } from '../../types/auth'
import { createFilterOptions } from '../../utils/search'
import Flexbox from '../Layout/Flexbox'

interface INameNumberEntryProps {
    students: Record<number, IStudent>
    disabled?: boolean
    onSelectStudent: (student: IStudent) => void
    onEnterNumber: (entry: React.ReactText) => void
    matchesStudentNumber: (value: React.ReactText) => boolean
    getStudentDisabled?: (student: IStudent) => boolean
    onChange?: (event?: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
}

const ITEM_HEIGHT: number = 36
const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        margin: `${theme.spacing(1)}px 0`,
        padding: theme.spacing(1),
        position: 'relative'
    },
    menuPaper: {
        maxHeight: theme.spacing(36),
        width: '100%'
    },
    menuList: {
        outline: 'none'
    },
    popper: {
        zIndex: 1000,
        marginTop: theme.spacing(2)
    }
}))

const NameNumberEntry = (props: INameNumberEntryProps) => {
    const classes = useStyles()
    const theme: Theme = useTheme()
    const maxHeight: number = theme.spacing() + ITEM_HEIGHT * 10
    const { students, disabled, getStudentDisabled, matchesStudentNumber } = props

    const [menuRef, setMenuRef]: [Element, React.Dispatch<React.SetStateAction<Element>>] = React.useState(null)
    const [inputValue, setInputValue] = React.useState('')
    // const [menuIndex, setMenuIndex] = React.useState(-1)

    const open: boolean = Boolean(menuRef)
    const filterOptions = createFilterOptions(students, { stringify: (key: number) => students[key].name })
    const filteredStudents: IStudent[] = filterOptions(Object.keys(students), inputValue).map((key: number) => students[key])
    const numStudents: number = filteredStudents.length
    const numEntries: number = numStudents === 0 ? 1 : numStudents
    const isEmpty: boolean = numStudents === 0

    const handleMenuClose = () => {
        setMenuRef(null)
    }

    const handleChangeValue = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { value } = event.target
        setInputValue(value)
        setMenuRef(event.currentTarget.parentElement)
        if (props.onChange) {
            props.onChange(event)
        }
    }

    /**
     * To be implemented later.
     */
    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        /*
        const { keyCode } = event
        if (keyCode === 27) {
            // Escape key
            handleMenuClose()
            return
        } else if (!menuRef) {
            setMenuIndex(-1)
            setMenuRef(event.currentTarget)
            return
        }
        switch (keyCode) {
            case 38: // Arrow up
                if (menuIndex === -1) {
                    setMenuIndex(numEntries - 1)
                } else {
                    setMenuIndex(menuIndex === 0 ? numEntries - 1 : menuIndex - 1)
                }
                return
            case 40: // Arrow down
                if (menuIndex === -1) {
                    setMenuIndex(0)
                } else {
                    setMenuIndex((menuIndex + 1) % numEntries)
                }
                return
        }
        */
    }

    const handleClickStudent = (student: IStudent) => {
        props.onSelectStudent(student)
        setInputValue('')
        handleMenuClose()
    }

    const handleCreateEntry = (value: string) => {
        props.onEnterNumber(Number(value))
        setInputValue('')
        handleMenuClose()
    }

    const Row = (rowProps: ListChildComponentProps) => {
        const { index, data } = rowProps
        const style = { ...rowProps.style, top: Number(rowProps.style.top) + theme.spacing() }
        if (isEmpty) {
            return matchesStudentNumber(inputValue) ? (
                <MenuItem style={style} key={index} onClick={() => handleCreateEntry(inputValue)}>
                    {`Add '${inputValue}'`}
                </MenuItem>
            ) : (
            <MenuItem disabled style={style} key={index}><em>No results for '{inputValue}'</em></MenuItem>
            )
        }
        const student: IStudent = data[index]
        return (
            <MenuItem disabled={getStudentDisabled && getStudentDisabled(student)} style={style} key={index} onClick={() => handleClickStudent(student)}>
                {student.name}
            </MenuItem>
        )
    }

    const innerElementType: ReactElementType = React.forwardRef(({ style, ...rest }, ref) => (
        <div
            ref={ref}
            style={{ ...style, height: Number(style.height) + theme.spacing(2) }}
            {...rest}
        />
    ))

    return (
        <Paper className={classes.root}>
            <ClickAwayListener onClickAway={() => handleMenuClose()}>
                <Popper
                    disablePortal
                    open={open}
                    anchorEl={menuRef}
                    className={classes.popper}
                    // onClose={handleMenuClose}
                    // anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} // Not usable on Popper.
                    // transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                    // getContentAnchorEl={null}
                    // disableEnforceFocus
                    // disableAutoFocus
                >
                    <Paper>
                        <MenuList disablePadding className={classes.menuList}>
                            <FixedSizeList
                                height={numEntries < 10 ? theme.spacing(2) + ITEM_HEIGHT * numEntries : maxHeight}
                                width={menuRef ? menuRef.clientWidth + theme.spacing(2) : 500}
                                itemSize={ITEM_HEIGHT}
                                innerElementType={innerElementType}
                                itemCount={numEntries}
                                itemData={filteredStudents}
                            >
                                {Row}
                            </FixedSizeList>
                        </MenuList>
                    </Paper>
                </Popper>
            </ClickAwayListener>
            <FormControl fullWidth>
                <Input
                    placeholder='Enter full name or Student Number'
                    disableUnderline
                    fullWidth
                    onSubmit={() => console.log('On submit!')}
                    onChange={handleChangeValue}
                    onKeyDown={handleKeyDown}
                    // onBlur={() => handleMenuClose()}
                    value={inputValue}
                    disabled={disabled}
                    endAdornment={
                        <InputAdornment position='end'>
                            <Flexbox>
                                <IconButton size='small'><Icon>close</Icon></IconButton>
                            </Flexbox>
                        </InputAdornment>
                    }
                />
            </FormControl>
        </Paper>
    )
}

export default NameNumberEntry
