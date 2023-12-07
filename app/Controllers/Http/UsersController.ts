// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios'
import { ApiSuccessResponse } from '../../../utils'
export default class UsersController {
  public async GetData() {
    try {
      const { data } = await axios.get('https://api.github.com/user/repos', {
        headers: {
          Authorization: 'Bearer ' + process.env.GITHUB_TOKEN,
        },
      })

      const privateRepos = data.filter((repo: any) => repo.private === true)

      const repoData = privateRepos.map((repo: any) => {
        const {
          id,
          node_id: NodeID,
          name,
          full_name: fullName,
          owner,
          html_url: htmlUrl,
          url,
          description,
          size,
          visibility,
        } = repo

        //   Get Owners Data extract
        const ownerData = {
          username: owner.login,
          id: owner.id,
          node_id: owner.node_id,
          avatar_url: owner.avatar_url,
          gravatar_id: owner.gravatar_id,
          type: owner.type,
          siteAdmin: owner.site_admin,
        }

        // API response
        return {
          id,
          node_id: NodeID,
          name,
          full_name: fullName,
          owner: ownerData,
          html_url: htmlUrl,
          url,
          description,
          size,
          visibility,
          private: true,
        }
      })
      return ApiSuccessResponse(repoData, 'Private repositories retrieved successfully', 200)
    } catch (error) {
      return { error }
    }
  }
}
