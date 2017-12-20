# wox-upload

## 使用

> 配合 ant-form getFieldDecorator 使用，initialValue值为 String(单图) 或 Array(多图)类型；

```javascript
<FormItem>
  {getFieldDecorator('logoUrl', {
    rules: [{
      required: true, message: 'Please upload your logo'
    }],
    initialValue: curData.logoUrl || '',
  })(
    <UploadCom notSimple={false} Max={1} imgType={['png']} imgSize={1024} action={`${Base.img}/wximg/dppLogo/upload`}/>
  )}
</FormItem>
```

## 参数

> **imgType** 图片类型：Array,默认包含 jpg png jpeg gif；

> **imgSize** 图片大小：Number 单位为KB,默认 1024KB；

> **action**  图片上传URL：String；

> **notSimple**  是否单图：Boolean,默认 false；

> **Max**  图片上传最大数：Number,默认 1；