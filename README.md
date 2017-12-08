# wox-upload

## 使用

> 配合 ant-form getFieldDecorator 使用，initialValue值为 String类型，只支持单图；

```javascript
<FormItem>
  {getFieldDecorator('logoUrl', {
    rules: [{
      required: true, message: 'Please upload your logo'
    }],
    initialValue: curData.logoUrl || '',
  })(
    <UploadCom imgType={['png']} imgSize={1024} action={`${Base.img}/wximg/dppLogo/upload`}/>
  )}
</FormItem>
```

## 参数

> **imgType** 图片类型：Array；

> **imgSize** 图片大小：Number 单位为KB；

> **action**  图片上传URL：String；