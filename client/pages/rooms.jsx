import React from 'react'
import milou from '~/lib/milou'
import { useAuth } from '~/components/auth/auth-context'
import Header from '~/components/layout/header'
import Content from '~/components/layout/content'
import RoomsList from '~/components/rooms/list'
import RoomsListEmpty from '~/components/rooms/list-empty'
import RoomCreate from '~/components/rooms/create'
import RequestError from '~/components/request-error'
import ContentLoading from '~/components/layout/content-loading'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
  content: {
    padding: theme.spacing(2)
  }
}))

const Rooms = () => {
  const { t } = useTranslation()
  const classes = useStyles()
  const { userJwt } = useAuth()
  const [rooms, setRooms] = React.useState(null)
  const [inFlight, setInFlight] = React.useState(true)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    if (!userJwt) return

    milou({
      url: `${process.env.API_URL}/rooms`,
      jwt: userJwt
    })
      .then(setRooms)
      .catch(setError)
      .finally(() => setInFlight(false))
  }, [userJwt])

  return (
    <>
      <Header title={t('rooms')}>
        <RoomCreate buttonVariant="outlined" />
      </Header>
      <Content className={classes.content}>
        {inFlight && <ContentLoading />}
        {error && <RequestError />}
        {rooms && rooms.length === 0 && <RoomsListEmpty />}
        {rooms && rooms.length > 0 && <RoomsList rooms={rooms} />}
      </Content>
    </>
  )
}

export default Rooms
