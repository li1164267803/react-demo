import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import { useMemo, useState } from 'react'
import classnames from 'classnames'
import dayjs from 'dayjs'
import _ from 'lodash'
import { useSelector } from 'react-redux'
import DayBill from './components/DayBill'

const Month = () => {
    const billList = useSelector(state => state.bill.billList)
    const [dateVisible, setDateVisible] = useState(false)
    const [currentDate, setCurrentDate] = useState(() => {
        return dayjs(new Date()).format('YYYY-MM')
    })
    const monthGroup = useMemo(() => {
        return _.groupBy(billList, item => dayjs(item.date).format('YYYY-MM'))
    }, [billList])

    const [currentMonthList, setCurrentMonthList] = useState([])
    const mouthResult = useMemo(() => {
        return currentMonthList.reduce(
            (acc, item) => {
                if (item.type === 'pay') acc.pay += item.money
                if (item.type === 'income') acc.income += item.money
                acc.total = acc.pay + acc.income
                return acc
            },
            { pay: 0, income: 0, total: 0 }
        )
    }, [currentMonthList])
    console.log(monthGroup, 'monthGroup')
    function onConfirm(date) {
        setDateVisible(false)
        const formDate = dayjs(date).format('YYYY-MM')
        setCurrentDate(formDate)
        setCurrentMonthList(monthGroup[formDate] || [])
    }
    // 当前月按照日来做分组
    const dayGroup = useMemo(() => {
        // return出去计算之后的值
        const groupData = _.groupBy(currentMonthList, item => dayjs(item.date).format('YYYY-MM-DD'))
        const keys = Object.keys(groupData)
        return {
            groupData,
            keys,
        }
    }, [currentMonthList])
    return (
        <div className="monthlyBill">
            <NavBar className="nav" backArrow={false}>
                月度收支
            </NavBar>
            <div className="content">
                <div className="header">
                    {/* 时间切换区域 */}
                    <div className="date" onClick={() => setDateVisible(true)}>
                        <span className="text">{currentDate}月账单</span>
                        <span className={classnames('arrow', dateVisible && 'expand')}></span>
                    </div>
                    {/* 统计区域 */}
                    <div className="twoLineOverview">
                        <div className="item">
                            <span className="money">{mouthResult.pay.toFixed(2)}</span>
                            <span className="type">支出</span>
                        </div>
                        <div className="item">
                            <span className="money">{mouthResult.income.toFixed(2)}</span>
                            <span className="type">收入</span>
                        </div>
                        <div className="item">
                            <span className="money">{mouthResult.total.toFixed(2)}</span>
                            <span className="type">结余</span>
                        </div>
                    </div>
                    {/* 时间选择器 */}
                    <DatePicker
                        onCancel={() => setDateVisible(false)}
                        onConfirm={onConfirm}
                        onClose={() => setDateVisible(false)}
                        className="kaDate"
                        title="记账日期"
                        precision="month"
                        visible={dateVisible}
                        max={new Date()}
                    />
                </div>
                {/* 单日列表统计 */}
                {dayGroup.keys.map(key => {
                    return <DayBill key={key} date={key} billList={dayGroup.groupData[key]} />
                })}
            </div>
        </div>
    )
}

export default Month
