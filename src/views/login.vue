<template>
    <div class="login">
        <!-- <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
        >
            <h3 class="title">第二课堂后台管理系统</h3>
            <el-form-item prop="username">
                <el-input
                    v-model="loginForm.username"
                    type="text"
                    auto-complete="off"
                    placeholder="账号"
                >
                    <svg-icon
                        slot="prefix"
                        icon-class="user"
                        class="el-input__icon input-icon"
                    />
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input
                    v-model="loginForm.password"
                    type="password"
                    auto-complete="off"
                    placeholder="密码"
                    @keyup.enter.native="handleLogin"
                >
                    <svg-icon
                        slot="prefix"
                        icon-class="password"
                        class="el-input__icon input-icon"
                    />
                </el-input>
            </el-form-item>
            <el-form-item prop="code" v-if="captchaEnabled">
                <el-input
                    v-model="loginForm.code"
                    auto-complete="off"
                    placeholder="验证码"
                    style="width: 63%"
                    @keyup.enter.native="handleLogin"
                >
                    <svg-icon
                        slot="prefix"
                        icon-class="validCode"
                        class="el-input__icon input-icon"
                    />
                </el-input>
                <div class="login-code">
                    <img
                        :src="codeUrl"
                        @click="getCode"
                        class="login-code-img"
                    />
                </div>
            </el-form-item>
            <el-checkbox
                v-model="loginForm.rememberMe"
                style="margin:0px 0px 25px 0px;"
                >记住密码</el-checkbox
            >
            <el-form-item style="width:100%;">
                <el-button
                    :loading="loading"
                    size="medium"
                    type="primary"
                    style="width:100%;"
                    @click.native.prevent="handleLogin"
                >
                    <span v-if="!loading">登 录</span>
                    <span v-else>登 录 中...</span>
                </el-button>
            </el-form-item>
        </el-form> -->
        <!-- 微信登录 -->
        <div id="wxLogin"></div>
        <!--  底部  -->
        <div class="el-login-footer">
            <span>Copyright © 2018-2021 ruoyi.vip All Rights Reserved.</span>
        </div>
    </div>
</template>

<script>
    import querystring from 'querystring'
    import { getCodeImg } from '@/api/login'
    import Cookies from 'js-cookie'
    import { encrypt, decrypt } from '@/utils/jsencrypt'
    import {
        courseClassificationList,
        courseClassificationUpdateTime
    } from '@/api/application/secondClass/courseClassification.js'

    export default {
        name: 'Login',
        data() {
            return {
                wx: {
                    appid: '1000034', // TODO 更改
                    scope: 'snsapi_login',
                    redirect_uri: 'http://test.mingyuefusu.cn'
                },
                codeUrl: '',
                cookiePassword: '',
                loginForm: {
                    username: '',
                    password: '',
                    rememberMe: false,
                    code: '',
                    uuid: ''
                },
                loginRules: {
                    username: [
                        {
                            required: true,
                            trigger: 'blur',
                            message: '用户名不能为空'
                        }
                    ],
                    password: [
                        {
                            required: true,
                            trigger: 'blur',
                            message: '密码不能为空'
                        }
                    ],
                    code: [
                        {
                            required: true,
                            trigger: 'change',
                            message: '验证码不能为空'
                        }
                    ]
                },
                loading: false,
                redirect: undefined,
                captchaEnabled: false
            }
        },
        mounted() {
            // TODO Update
            // WwLogin({
            //     id: 'wxLogin',
            //     appid: 'wx6219dbfa9b86489e',
            //     agentid: '1000054',
            //     scope: 'snsapi_login',
            //     redirect_uri:'https://secondclass.ticknet.hnust.cn',
            //     state: '',
            //     href: ''
            // })
            var wwLogin = new WwLogin({
                    "id": "wxLogin",  
                    "appid": "wx6219dbfa9b86489e",
                    "agentid": "1000054",
                    "redirect_uri": "https://secondclass.ticknet.hnust.cn",
                    "state": "",
                    "href": "",
                    "lang": "zh",
            });
        },
        watch: {
            $route: {
                handler: function(route) {
                    this.redirect = route.query && route.query.redirect
                    const query = route.query
                    // debugger
                    if (query) {
                        this.redirect = query.redirect
                        let code = querystring.parse(location.href)['https://secondclass.ticknet.hnust.cn/?code']
                        console.log('code123:', code)
                        if (code) {
                            this.$store
                                .dispatch('LoginByCode', code)
                                .then(() => {
                                    courseClassificationList().then(value=>{
                                     localStorage.setItem('courseList',JSON.stringify(value.data))
                                        courseClassificationUpdateTime().then(value=>{
                                            localStorage.setItem('courseUpdateTime',value.data)
                                            this.$router
                                                .push({ path: this.redirect || '/' })
                                                .catch(() => {})
                                        })
                                    })
                                    // setTimeout(() => {
                                        
                                        window.location.href = 'http://secondclass.ticknet.hnust.cn'
                                    // },5000)
                                })
                                .catch(() => {
                                    this.loading = false
                                })
                            let newQuery = JSON.parse(
                                JSON.stringify(this.$route.query)
                            ) // 深拷贝
                            delete newQuery.code
                            delete newQuery.state
                            delete newQuery.appid
                            this.$router.replace({ query: newQuery })
                        }
                    }
                },
                immediate: true
            }
        },
        created() {
            this.getCode()
            this.getCookie()
        },
        methods: {
            getCode() {
                getCodeImg().then(res => {
                    this.captchaEnabled = res.data.enabled
                    if (res.data.enabled) {
                        this.codeUrl = 'data:image/gif;base64,' + res.data.img
                        this.loginForm.uuid = res.data.uuid
                    }
                })
            },
            getCookie() {
                const username = Cookies.get('username')
                const password = Cookies.get('password')
                const rememberMe = Cookies.get('rememberMe')
                this.loginForm = {
                    username:
                        username === undefined
                            ? this.loginForm.username
                            : username,
                    password:
                        password === undefined
                            ? this.loginForm.password
                            : decrypt(password),
                    rememberMe:
                        rememberMe === undefined ? false : Boolean(rememberMe)
                }
            },
            handleLogin() {
                console.log(23)
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.loading = true
                        if (this.loginForm.rememberMe) {
                            Cookies.set('username', this.loginForm.username, {
                                expires: 30
                            })
                            Cookies.set(
                                'password',
                                encrypt(this.loginForm.password),
                                { expires: 30 }
                            )
                            Cookies.set(
                                'rememberMe',
                                this.loginForm.rememberMe,
                                { expires: 30 }
                            )
                        } else {
                            Cookies.remove('username')
                            Cookies.remove('password')
                            Cookies.remove('rememberMe')
                        }
                        this.$store
                            .dispatch('Login', this.loginForm)
                            .then(() => {
                                courseClassificationList().then(value=>{
                                     localStorage.setItem('courseList',JSON.stringify(value.data))
                                     courseClassificationUpdateTime().then(value=>{
                                        localStorage.setItem('courseUpdateTime',value.data)
                                        this.$router
                                            .push({ path: this.redirect || '/' })
                                            .catch(() => {})
                                     })
                                })
                            })
                            .catch(() => {
                                this.loading = false
                                this.getCode()
                            }).finally(() => {
                                window.location.reload()
                            })
                    }
                })
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .login {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        background-image: url('../assets/images/bg.jpg');
        background-size: cover;
    }
    .title {
        margin: 0px auto 30px auto;
        text-align: center;
        color: #707070;
    }

    .login-form {
        border-radius: 6px;
        background: #ffffff;
        width: 400px;
        padding: 25px 25px 5px 25px;
        .el-input {
            height: 38px;
            input {
                height: 38px;
            }
        }
        .input-icon {
            height: 39px;
            width: 14px;
            margin-left: 2px;
        }
    }
    .login-tip {
        font-size: 13px;
        text-align: center;
        color: #bfbfbf;
    }
    .login-code {
        width: 33%;
        height: 38px;
        float: right;
        img {
            cursor: pointer;
            vertical-align: middle;
        }
    }
    .el-login-footer {
        height: 40px;
        line-height: 40px;
        position: fixed;
        bottom: 0;
        width: 100%;
        text-align: center;
        color: #fff;
        font-family: Arial;
        font-size: 12px;
        letter-spacing: 1px;
    }
    .login-code-img {
        height: 38px;
    }
</style>
